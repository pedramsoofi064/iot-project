<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="500"
    title="مشخصات"
  >
    <div class="order-detail__list">
      <div class="list__item" v-for="(item, index) in detail" :key="index">
        <div class="item-text">{{ item.title }}</div>
        <div class="item-dots">
          <span v-for="i in 15" :key="i"></span>
          
        </div>
        <div class="item-text">{{ item.value }}</div>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
export default {
  name: "orderDetail",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
    data: {
      reqiure: true,
      type: Object,
      default: () => {},
    },
  },
  components: {
    BaseModal,
  },
  data() {
    return {
      title: "",
      detail: [
        { title: "نام و نام خانوادگی", value: "پدرام صوفی" },
        { title: "آدرس", value: "مشهد هاشمیه 6" },
        { title: "شماره تماس", value: "09366390896" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.order-detail__list {
  .list__item {
    display: flex;
    margin: 10px 0;
    .item-text {
      font-weight: 500;
    }

    .item-dots {
      flex: 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 5px;
      > span {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: var(--grey-5);
      }
    }
  }
}
</style>