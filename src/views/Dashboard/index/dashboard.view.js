
import server1Icon from "@/assets/svg/ic_server.svg";
import server2Icon from "@/assets/svg/ic_server2.svg";
import userOutlineSvg from "@/assets/svg/ic_user_outline.svg";
import axios from "axios";
import sensorServices from "../sensor/sensor.services";
import gatewayServices from "../gateway/gateway.services";
export default {
    name: 'dashboard-main',
    components: {

        server1Icon,
        server2Icon,
        userOutlineSvg
    },
    data() {
        return {
            loadingAvg: false,
            avg: 0,
            sensors: [],
            gateways: [],
            periods: [
                {
                    value: "hour",
                    title: "ساعتی",
                },
                {
                    value: "day",
                    title: "روزانه",
                },
                {
                    value: "month",
                    title: "ماهانه",
                },
                {
                    value: "year",
                    title: "سالانه",
                },
            ],
            selectedPeriod: "",
            loadingSum: true,
            sumOption: {
                chart: {
                  id: "vuechart-example",
                },
                tooltip: {
                  enabled: false,
                },
                xaxis: {
                  categories: [],
                  labels: {
                    style: {
                      colors: [],
                      fontSize: "12px",
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: 400,
                      cssClass: "apexcharts-xaxis-label",
                    },
                  },
                },
                yaxis: {
                  labels: {
                    style: {
                      colors: [],
                      fontSize: "12px",
                      fontFamily: "Helvetica, Arial, sans-serif",
                      fontWeight: 400,
                      cssClass: "apexcharts-xaxis-label",
                    },
                  },
                },
              },
              sumSeries: [
                {
                  name: "series-1",
                  data: [],
                },
              ],
        }
    },
    watch: {
        selectedPeriod() {
            this.getSum();
        },
    },

    computed: {
        badUsage() {
            return this.avg > 100
        }
    },
    async mounted() {
        this.loadingAvg = true
        await this.getAvg();
        this.sensors = (await sensorServices.getAll()).data
        this.gateways = (await gatewayServices.getAll()).data
        this.loadingAvg = false
    },
    methods: {
        async getAvg() {

            try {
                const res = await axios({

                    method: "GET",
                    url: '/reports/average',
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.avg = res.data.average

            }
            catch {
                this.$toast.error("خطایی رخ داد");

            }

        },
        async getSum() {
            this.loadingSum = true;
            try {
                const res = await axios({
                    method: "GET",
                    url: `/reports/sum`,
                    params: {
                        period: this.selectedPeriod,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const { data } = res;
                this.sumOption.xaxis.categories = [];
                this.sumSeries[0].data = [];
                data.forEach((item) => {
                    this.sumOption.xaxis.categories.push(`${this.selectedPeriod !== 'hour' ? '' : new Date(item.time).toLocaleTimeString("fa-IR")} ${new Date(item.time).toLocaleDateString("fa-IR")}`);
                    this.sumOption.xaxis.labels.style.colors.push('white')
                    this.sumOption.yaxis.labels.style.colors.push('white')
                    this.sumSeries[0].data.push(item.total);
                });
            } catch {
                this.$toast.error("خطایی رخ داد");
            } finally {
                this.loadingSum = false;
            }
        }
    }

}