<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="580"
    :title="`${mode === 'add' ? 'ثبت' : 'ویرایش'} تخفیف`"
  >
    <div class="discount-modal">
      <form class="form">
        <ValidationObserver>
          <div class="discount-modal__date">
            <ValidationProvider
              class="form-field"
              name="تاریخ شروع"
              rules="required"
              v-slot="{ errors }"
            >
              <span class="field__title">از تاریخ</span>
              <div class="field__input">
                <input
                  type="text"
                  v-model="model.startDate"
                  id="my-custom-input1"
                />
                <date-picker
                  v-model="model.startDate"
                  format="jYYYY/jMM/jDD"
                  element="my-custom-input1"
                  color="var(--primary-main)"
                />
                <calendarSvg />
              </div>

              <span class="field__error" v-if="errors.length">{{
                errors[0]
              }}</span>
            </ValidationProvider>
            <ValidationProvider
              class="form-field"
              name="تاریخ پایان"
              rules="required"
              v-slot="{ errors }"
            >
              <span class="field__title">تا تاریخ</span>
              <div class="field__input">
                <input
                  type="text"
                  v-model="model.endDate"
                  id="my-custom-input2"
                />
                <date-picker
                  v-model="model.endDate"
                  format="jYYYY/jMM/jDD"
                  element="my-custom-input2"
                  color="var(--primary-main)"
                />
                <calendarSvg />
              </div>

              <span class="field__error" v-if="errors.length">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>
          <div class="discount-modal__type">
            <nav class="type__nav">
              <div
                class="nav__item"
                :class="{ active: activeTypeTab == 0 }"
                @click="activeTypeTab = 0"
              >
                تخفیف دسته بندی
              </div>
              <div
                class="nav__item"
                :class="{ active: activeTypeTab == 1 }"
                @click="activeTypeTab = 1"
              >
                تخفیف کالا
              </div>
              <div
                class="nav__item"
                :class="{ active: activeTypeTab == 2 }"
                @click="activeTypeTab = 2"
              >
                کد تخفیف
              </div>
            </nav>
            <div class="type__main">
              <transition name="slide">
                <div v-if="activeTypeTab == 0" class="type__assortment">
                  <v-checkbox
                    v-for="(chk, index) in assortments"
                    :key="index"
                    v-model="chk.value"
                    hide-details="true"
                    color="primary"
                    :label="chk.title"
                  ></v-checkbox>
                </div>
                <div v-if="activeTypeTab == 1" class="type__product">
                  <div class="type__products">
                    <div
                      v-for="(product, index) in products"
                      :key="index"
                      class="product__item"
                    >
                      <div class="product__item__avatar mock-img">image</div>
                      <div class="product__item__name">{{ product.title }}</div>
                      <div
                        class="product__item__delete"
                        v-ripple
                        @click="onDeletePruduct(index)"
                      >
                        <deletetSvg />
                      </div>
                    </div>
                  </div>
                  <div
                    class="type__add-product"
                    v-ripple
                    @click="showAssortmentProductModal = true"
                  >
                    <plusSvg />
                    افزودن کالای جدید
                  </div>
                </div>
                <div v-if="activeTypeTab == 2" class="type__code">
                  <ValidationProvider
                    class="form-field"
                    name="کد تخفیف"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-card v-click-outside="func">
                      <div class="field__input">
                        <div class="input">
                          <input
                            type="text"
                            v-model="model.code"
                            @focus="showCodeOverlay = false"
                          />
                          <span class="copy" v-if="!showCodeOverlay">
                            <copySvg />
                            کپی کردن</span
                          >
                        </div>
                        <transition name="fade">
                          <div v-if="showCodeOverlay" class="overlay">
                            کد تخفیف اینجا نمایش داده می شود.
                          </div>
                        </transition>
                      </div>
                    </v-card>
                    <span class="field__error" v-if="errors.length">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </div>
              </transition>
            </div>
          </div>
          <div class="discount-modal__amount">
            <ValidationProvider
              class="form-field"
              name="درصد"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="field__input">
                <input type="text" v-model="model.mobile" />
                <span class="unit">درصد</span>
              </div>
              <span class="field__error" v-if="errors.length">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </div>
          <div class="discount-modal__actions">
            <v-btn color="primary">{{
              `${mode === "add" ? "ثبت" : "ویرایش"} تخفیف`
            }}</v-btn>
            <v-btn color="primary" outlined>لغو</v-btn>
          </div>
        </ValidationObserver>
      </form>

      <assortmentProductsModal
        :show="showAssortmentProductModal"
        title="انتخاب کالا برای تخفیف"
        searchPlaceholder="جستجو بین کالا ها"
        :choosable="true"
        @close="showAssortmentProductModal = false"
        @clicked="selectProduct($event)"
      />

      <confirmModal
        :show="showConfirmModal"
        message="آیا از حذف کالا اطمینان دارید ؟ "
        title="حذف کالا"
        btnConfirm="حذف کالا"
        @close="showConfirmModal = false"
        @cancel="showConfirmModal = false"
        @confirm="deletePruduct()"
      />
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import calendarSvg from "@/assets/svg/ic_calendar.svg";
import plusSvg from "@/assets/svg/ic_add.svg";
import copySvg from "@/assets/svg/ic_copy.svg";
import deletetSvg from "@/assets/svg/ic_delete_linear.svg";
import assortmentProductsModal from "@/components/Dashboard/product/modals/assortmentProducts.modal.vue";
import confirmModal from "@/components/Dashboard/modal/confirm.modal.vue";

export default {
  name: "discountProductModal",
  components: {
    BaseModal,
    ValidationObserver,
    ValidationProvider,
    calendarSvg,
    plusSvg,
    deletetSvg,
    assortmentProductsModal,
    confirmModal,
    copySvg,
  },
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
    mode: {
      reqiure: false,
      type: String,
      default: "add",
    },
  },
  data() {
    return {
      activeTypeTab: 2,
      showAssortmentProductModal: false,
      showConfirmModal: false,
      selectedProduct: null,
      showCodeOverlay: true,
      model: {
        type: "",
        startDate: "",
        endDate: "",
        amount: "",
        code: "",
      },
      assortments: [
        { title: "عنوان", value: "" },
        { title: "عنوان", value: "" },
        { title: "عنوان", value: "" },
        { title: "عنوان", value: "" },
        { title: "عنوان", value: "" },
        { title: "عنوان", value: "" },
        { title: "عنوان", value: "" },
      ],
      products: [{ title: "کفش مخصوص پیاده روی" }],
    };
  },
  methods: {
    selectProduct(item) {
      console.log(item);
      this.showAssortmentProductModal = false;
      this.products.push({ title: "کفش مخصوص پیاده روی" });
    },
    deletePruduct() {
      this.products = this.products.filter(
        (item, i) => i !== this.selectedProduct
      );
      this.showConfirmModal = false;
    },
    onDeletePruduct(index) {
      this.selectedProduct = index;
      this.showConfirmModal = true;
    },
    func() {
      this.showCodeOverlay = true && !this.model.code;
    },
  },
};
</script>

<style lang="scss" scoped>
.discount-modal {
  &__date {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 10px;
  }
  &__type {
    margin-top: 15px;
    .type__nav {
      height: 56px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-gap: 10px;
      background-color: var(--grey-3);
      padding: 8px;
      border-radius: 16px;
      color: var(--grey-5);
      .nav__item {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.5s;
        font-size: 14px;
        &.active {
          background-color: var(--primary-main);
          color: white;
        }
      }
    }

    .type__main {
      max-height: 150px;
      overflow: auto;
      direction: ltr;
      overflow-x: hidden;
      margin-top: 25px;
      .type__assortment {
        padding: 0 25px;
        .v-input--selection-controls {
          margin-top: 5px !important;
          &::v-deep {
            label {
              color: black !important;
            }
          }
        }
      }

      .type__product {
        .type__products {
          padding: 0 20px;
          .product__item {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            &__avatar {
              width: 72px;
              height: 72px;
            }
            &__name {
              flex: 1;
              margin: 0 15px;
              font-size: 14px;
              font-weight: 400;
            }
            &__delete {
              cursor: pointer;
              width: 32px;
              height: 32px;
              border-radius: 4px;
              background-color: var(--cover-red-ligth);
              display: flex;
              justify-content: center;
              align-items: center;
              svg path {
                fill: var(--cover-red-dark);
              }
            }
          }
        }
        .type__add-product {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 5px 0 5px 5px;
          width: max-content;
          font-size: 14px;
          margin-top: 15px;
          color: var(--primary-main);
          svg path {
            fill: var(--primary-main);
          }
        }
      }

      .type__code {
        .field__input {
          position: relative;
          .input {
            width: 100%;
            display: flex;
            align-items: center;
            z-index: 2;
            > input {
              flex: 1;
              padding: 0 10px;
              border: none;
              background: none;
              outline: none;
            }

            .copy {
              font-size: 12px;
              display: flex;
              align-items: center;
              padding: 2px 5px;
              margin-left: 10px;
              cursor: pointer;
              background-color: var(--primary-lightest);
              color: var(--primary-main);
              border-radius: 4px;
              svg {
                margin-left: 3px;
              }
            }
          }
          .overlay {
            position: absolute;
            display: flex;
            align-items: center;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: var(--grey-3);
            padding: 0 10px;
            color: var(--grey-5);
            font-weight: 500;
            font-size: 14px;
          }
        }
      }

      &::-webkit-scrollbar {
        width: 4px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: var(--grey-3);
        border-radius: 5px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--grey-6-middle);
        border-radius: 5px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
  &__amount {
    margin-top: 15px;
    .field__input {
      display: flex;
      align-items: center;
      .unit {
        margin-left: 10px;
        font-weight: 500;
        color: var(--grey-5);
      }
    }
  }
  &__actions {
    display: flex;
    margin-top: 25px;
    .v-btn {
      width: 100%;
      flex: 1;
      &:first-child {
        margin-left: 15px;
      }
    }
  }
}
</style>