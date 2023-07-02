<template>
  <div class="sensor">
    <div class="sensor__header">
      <h1>جزییات سنسور</h1>
      <arrSvg @click="$router.go(-1)" />
    </div>
    <div class="sensor__main">
      <template v-if="loading"> <h6>در حال بارگیری ...</h6></template>
      <template v-else-if="!loading && sensor">
        <div class="sensor__info">
          <v-text-field
            label="نام"
            variant="underlined"
            v-model="sensor.name"
            readonly
          ></v-text-field>

          <v-text-field
            label="مک آدرس (mac address)"
            variant="underlined"
            v-model="sensor.macAddress"
            readonly
          ></v-text-field>

          <v-text-field
            label="آی پی (ip v4)"
            variant="underlined"
            v-model="sensor.ipv4"
            readonly
          ></v-text-field>

          <v-text-field
            label="نسخه"
            variant="underlined"
            v-model="sensor.version"
            readonly
          ></v-text-field>
        </div>
      </template>
    </div>
    <div class="sensor__latest" v-if="latest">
      <h3>آخرین مقادیر</h3>
      <h4>
        تاریخ: {{ new Date(latest.time).toLocaleTimeString("fa-IR") }}
        {{ new Date(latest.time).toLocaleDateString("fa-IR") }}
      </h4>
      <apexchart type="bar" :options="options" :series="series"></apexchart>
    </div>
    <div class="sensor__latest">
      <h3>مجموع مصرف</h3>
      <v-select
        :items="periods"
        item-text="title"
        item-value="value"
        v-model="selectedPeriod"
      ></v-select>
      <apexchart
        v-if="!loadingSum"
        type="bar"
        :options="sumOption"
        :series="sumSeries"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import sernsorServices from "../sensor.services";
import arrSvg from "@/assets/svg/ic_arrow-left_blue.svg";
import axios from "axios";

export default {
  name: "sensorDetails",
  components: {
    arrSvg,
  },
  data() {
    return {
      loading: false,
      loadingLatest: false,
      sensor: null,
      latest: null,
      options: {
        chart: {
          id: "vuechart-example",
        },
        tooltip: {
          enabled: false,
        },
        xaxis: {
          categories: ["THDi", "THDv", "consumption", "voltage", "current"],
          labels: {
            style: {
              colors: ["white", "white", "white", "white", "white"],
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
              colors: ["white", "white", "white", "white", "white"],
              fontSize: "12px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-xaxis-label",
            },
          },
        },
      },
      series: [
        {
          name: "series-1",
          data: [],
        },
      ],
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
    };
  },
  mounted() {
    this.getData();
    this.getLatest();
  },
  computed: {
    sensorID() {
      return this.$route.params.id;
    },
  },
  watch: {
    selectedPeriod() {
      this.getSum();
    },
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const { data } = await sernsorServices.getOne(this.sensorID);
        this.sensor = data;
      } catch {
        this.$toast.error("خطایی رخ داد");
      } finally {
        this.loading = false;
      }
    },
    async getLatest() {
      this.loadingLatest = true;
      try {
        const { data } = await axios({
          method: "GET",
          url: `/reports/latest/${this.sensorID}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.latest = data;
        this.loadingLatest = false;
        this.series[0].data.push(data.THDi);
        this.series[0].data.push(data.THDv);
        this.series[0].data.push(data.consumption);
        this.series[0].data.push(data.voltage);
        this.series[0].data.push(data.current);
      } catch {
        this.$toast.error("خطایی رخ داد");
      }
    },
    async getSum() {
      this.loadingSum = true;
      try {
        const res = await axios({
          method: "GET",
          url: `/reports/sum/${this.sensorID}`,
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
          this.sumOption.xaxis.categories.push(
            `${
              this.selectedPeriod !== "hour"
                ? ""
                : new Date(item.time).toLocaleTimeString("fa-IR")
            } ${new Date(item.time).toLocaleDateString("fa-IR")}`
          );
          this.sumSeries[0].data.push(item.total);
          this.sumOption.xaxis.labels.style.colors.push("white");
          this.sumOption.yaxis.labels.style.colors.push("white");
        });
      } catch {
        this.$toast.error("خطایی رخ داد");
      } finally {
        this.loadingSum = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sensor {
  &__header {
    display: flex;
    justify-content: space-between;
    svg {
      cursor: pointer;
    }
  }
  &__main {
    margin-top: 25px;
  }
  &__info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 15px;
    margin-bottom: 25px;
  }
  .sensor__latest {
    // background-color: white;
    direction: rtl;
    h3 {
      margin-bottom: 15px;
    }
  }
}
</style>