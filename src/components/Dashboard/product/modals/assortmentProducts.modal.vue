<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="800"
    :title="title"
  >
    <div class="assortment_products">
      <div class="assortment_products-search form-field">
        <div class="field__input">
          <SearchSvg />
          <input
            type="text"
            v-model="searchKey"
            :placeholder="searchPlaceholder"
          />
        </div>
      </div>
      <div class="assortment_products-list">
        <ProductComponent
          v-for="(product, index) in products"
          :key="index"
          :data="product"
          :choosable="choosable"
          @clicked="$emit('clicked' , product)"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
import ProductComponent from "@/components/Dashboard/product/product.component.vue";

import SearchSvg from "@/assets/svg/ic_search.svg";

export default {
  name: "assortmentProduct",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    searchPlaceholder: {
      type: String,
      default: "",
    },
    choosable: {
      type: Boolean,
      default: false
    }
    
  },
  components: {
    BaseModal,
    SearchSvg,
    ProductComponent,
  },
  data() {
    return {
      searchKey: "",
      products: [
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
          status: "block",
        },
        {
          id: 1,
        },
        {
          id: 1,
          status: "block",
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.assortment_products {
  overflow: auto;
  direction: ltr;
  padding: 0 20px;
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
.assortment_products-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
  max-height: 450px;
  direction: rtl;
}

.field__input {
  padding: 0 5px;
}
</style>