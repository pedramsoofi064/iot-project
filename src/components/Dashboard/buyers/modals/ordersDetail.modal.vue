<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="800"
    :title="title"
  >
    <div class="orders-detail">
      <div class="orders-detail__contact-info">
        <span class="contact-info__item">
          <LocationSvg />
          {{ address }}
        </span>
        <span class="contact-info__item">
          <MobileSvg />
          {{ phoneNubmer }}
        </span>
      </div>
      <div class="orders-detail__list">
        <v-data-table
          :headers="headers"
          :items="body"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="row"
          :items-per-page="5"
          class="custom-table"
        >
          <template v-slot:item.price="{ item }">
            {{ item.price | DigitToMoney }} تومان
          </template>
          <template v-slot:item.date="{ item }" class="persian-date">
            {{ dateGenerator(item.date) }}
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="details-td">
              <v-data-table
                :headers="subTableHeader"
                :items="item.details"
                :items-per-page="5"
                class="custom-table"
                hide-default-footer
              >
                <template v-slot:item.product="{ item }">
                  <div class="product-td">
                    <span class="product-td__image mock-img"></span>
                    <span class="product-td__title">
                      {{ item.product.name }}</span
                    >
                  </div>
                </template>
                <template v-slot:item.price="{ item }">
                  {{ item.price | DigitToMoney }} تومان
                </template>
                <template v-slot:footer>
                  <div class="details-footer">
                    <span>مبلغ کل سفارش</span>
                    <span>{{ 125487545 | DigitToMoney }} تومان</span>
                  </div>
                </template>
              </v-data-table>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
import LocationSvg from "@/assets/svg/ic_location_linear.svg";
import MobileSvg from "@/assets/svg/ic_mobile.svg";
import DigitToMoney from "@/resources/filters/DigitToMoney";

export default {
  name: "confirm",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
    title: {
      reqiure: true,
      type: String,
      default: "",
    },
    data: {
      reqiure: true,
      type: Object,
      default: () => {},
    },
  },
  filters: {
    DigitToMoney,
  },
  components: {
    BaseModal,
    LocationSvg,
    MobileSvg,
  },
  data() {
    return {
      address: "مشهد، بلوار هاشمیه، هاشمیه ۲، پلاک ۱۰",
      phoneNubmer: "09366390856",
      headers: [
        {
          text: "ردیف",
          align: "center",
          sortable: false,
          value: "row",
        },
        {
          text: "شماره سفارش",
          align: "center",
          sortable: false,
          value: "number",
        },
        {
          text: "تاریخ ثبت سفارش",
          align: "center",
          sortable: false,
          value: "date",
        },
        {
          text: "مبلغ کل ",
          align: "center",
          sortable: false,
          value: "price",
        },
        {
          text: "جزئیات",
          align: "center",
          sortable: false,
          value: "data-table-expand",
        },
      ],
      body: [
        {
          row: 1,
          number: 1236547,
          date: new Date(),
          price: 10000000,
          details: [
            {
              product: { name: "کالا", image: "" },
              count: 2,
              price: 1225000,
            },
            {
              product: { name: "کالا", image: "" },
              count: 2,
              price: 1225000,
            },
          ],
        },
        {
          row: 2,
          number: 1236547,
          date: new Date(),
          price: 10000000,
          details: [
            {
              product: { name: "کالا", image: "" },
              count: 2,
              price: 1225000,
            },
          ],
        },
      ],
      subTableHeader: [
        {
          text: "کالا",
          align: "center",
          sortable: false,
          value: "product",
        },
        {
          text: "تعداد",
          align: "center",
          sortable: false,
          value: "count",
        },
        {
          text: "مبلغ",
          align: "center",
          sortable: false,
          value: "price",
        },
      ],
    };
  },
  methods: {
    dateGenerator(date) {
      const formatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("fa-IR", formatOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.orders-detail {
  &__contact-info {
    display: flex;
    flex-direction: column;
    .contact-info__item {
      display: flex;
      margin-bottom: 10px;
      color: var(--grey-6-middle);
      font-weight: 500;
      svg {
        margin-left: 5px;
      }
    }
  }
  &__list {
    margin-top: 30px;
  }
}

.custom-table {
  .details-td {
    padding: 25px;
  }

  .product-td {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    &__image {
      width: 32px;
      height: 32px;
      margin-left: 15px;
    }
  }

  .details-footer {
    height: 50px;
    background-color: var(--primary-main);
    padding: 0 15px 0 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>