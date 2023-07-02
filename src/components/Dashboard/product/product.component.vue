<template>
  <section class="product" :class="{choosable: choosable}" @click="$emit('clicked')">
    <div class="product__header">
      <div class="product__header__status">
        <span
          v-if="data.status === 'block'"
          class="product__header__status-block"
          >مسدود</span
        >
      </div>
      <div class="product__header__more">
        <v-menu class="" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> ... </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in filterMoreActions"
              :key="index"
            >
              <v-btn class="more__list_item" @click="menuItemClicked(item)">
                <component :is="item.icon" />
                <span class="more__list_item-text">{{ item.title }}</span>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="product__image">
      <span :class="{ default_image: true }">
        <productSvg />
      </span>
      <img src="" v-if="false" alt="" />
    </div>
    <div class="product__assortment">
      <span class="product__assortment-item">دسته‌بندی</span>
    </div>
    <div class="product__name">
      روغن زیتون بی بو کریستال طلایی 3000 میلی لیتر
    </div>
    <div class="product__price">
      <span class="product__price-off">
        <span class="product__price__value">{{ 25000 | DigitToMoney }}</span>
        <span class="product__price__unit">تومان تخفیف</span>
      </span>
      <span class="product__price-real">
        <span class="product__price__value">{{ 250000 | DigitToMoney }}</span>
        <span class="product__price__unit">تومان </span>
      </span>
    </div>

    <confirmModal
      :show="showConfirmModal"
      :title="confirmModalData.title"
      :message="confirmModalData.message"
      :btnConfirm="confirmModalData.btnConfirm"
      :btnCancel="confirmModalData.btnCancel"
      @close="showConfirmModal = false"
      @cancel="showConfirmModal = false"
      @confirm="showConfirmModal = false"
    />
    <discountProductModal
      :show="showDiscountModal"
      @close="showDiscountModal = false"
      @cancel="showDiscountModal = false"
      @confirm="showDiscountModal = false"
    />
  </section>
</template>

<script src="./product.component.js">
</script>

<style lang="scss" src="./product.component.scss">
</style>