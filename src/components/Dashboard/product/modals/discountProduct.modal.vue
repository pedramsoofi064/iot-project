<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="700"
    title="ثبت تخفیف"
  >
    <ValidationObserver>
      <form class="form discount-modal__form">
        <ValidationProvider
          class="modal-form__radio-group"
          name="طرح"
          rules="required"
          v-slot="{ errors }"
        >
          <label
            v-for="(item, index) in types"
            :key="index"
            class="radio-group__label"
          >
            <input type="radio" :value="item.value" v-model="model.type" />
            {{ item.title }}
          </label>
          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form-field"
          name="تاریخ شروع"
          rules="required"
          v-slot="{ errors }"
        >
          <span class="field__title">از تاریخ</span>
          <div class="field__input">
            <input type="text" v-model="model.startDate" id="my-custom-input" />
            <date-picker
              v-model="model.startDate"
              format="jYYYY/jMM/jDD"
              element="my-custom-input"
              color="var(--primary-main)"
            />
            <calendarSvg />
          </div>

          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form-field"
          name="تاریخ پایان"
          rules="required"
          v-slot="{ errors }"
        >
          <span class="field__title">تا تاریخ</span>
          <div class="field__input">
            <input type="text" v-model="model.endDate" id="my-custom-input" />
            <date-picker
              v-model="model.endDate"
              format="jYYYY/jMM/jDD"
              element="my-custom-input"
              color="var(--primary-main)"
            />
            <calendarSvg />
          </div>

          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form-field"
          name="میزان تخفیف"
          rules="required"
          v-slot="{ errors }"
        >
          <div class="field__input">
            <input
              type="text"
              placeholder="میزان تخفیف"
              v-model="model.mobile"
            />
          </div>
          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="form-field unit-selector">
          <span :class="{ active: true }">درصد</span>
          <span>تومان</span>
        </div>
        <div class="discount-modal__actions">
          <v-btn color="primary" disabled @click="$emit('discount')">اعمال تخفیف</v-btn>
          <v-btn color="primary" outlined @click="$emit('cancel')">لغو</v-btn>
        </div>
      </form>
    </ValidationObserver>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import calendarSvg from "@/assets/svg/ic_calendar.svg";

export default {
  name: "discountProduct",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseModal,
    ValidationObserver,
    ValidationProvider,
    calendarSvg,
  },
  data() {
    return {
      model: {
        type: "",
        startDate: "",
        endDate: "",
      },
      types: [
        {
          title: "تخفیف 10 درصدی دسته بندی اول",
          value: "1",
        },
        {
          title: "تخفیف 20 درصدی",
          value: "2",
        },
        {
          title: "تخفیف مخصوص این کالا",
          value: "3",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.discount-modal__form {
  display: flex;
  flex-wrap: wrap;
  .form-field {
    width: 48%;
    &:nth-child(2n+1) {
      margin-left: 0;
    }
    &:nth-child(2n) {
      margin-left: 20px;
    }
  }
}
.modal-form__radio-group {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  .radio-group__label {
    font-style: normal;
    margin-bottom: 15px;
    font-weight: 500;
    line-height: 24px;
    > input {
      margin-left: 10px;
    }
  }
}

.unit-selector {
  background-color: var(--grey-3);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0 10px;
  > span {
    border-radius: 10px;
    cursor: pointer;
    flex: 1;
    text-align: center;
    color: var(--grey-5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 30px;

    &:first-child {
      margin-left: 5px;
    }
    &.active {
      background-color: var(--primary-main);
      color: white;
    }
  }
}
.discount-modal__actions {
  display: flex;
  margin-top: 20px;
  min-width: 100%;
  .v-btn {
    flex: 1;
    height: 40px;
    &:first-child {
      margin-left: 15px;
    }
  }
}
</style>