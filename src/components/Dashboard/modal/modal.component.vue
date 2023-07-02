<template>
  <v-dialog class="base-modal" v-model="show" persistent :max-width="maxWidth">
    <div class="modal">
      <div class="modal-main">
        <span class="modal-main__close" @click="$emit('close')">&times;</span>
        <div class="modal-main__title">{{ title }}</div>
        <slot />
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: "base-model",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
    maxWidth: {
      reqiure: true,
      type: Number,
      default: 250,
    },
    title: {
      reqiure: true,
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" >
.base-modal {
  box-shadow: none !important;
}
.modal {
  background-color: #031c3a !important;

  padding: 15px;
  border-radius: 24px;
  .modal-main {
    padding: 25px;
    border: 1px solid var(--grey-5);
    box-sizing: border-box;
    border-radius: 24px;
    position: relative;

    &__title {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 30px;
    }
    &__close {
      font-size: 30px;
      font-weight: bold;
      position: absolute;
      cursor: pointer;
      left: 25px;
      top: 15px;
      &:hover {
        color: var(--grey-5);
      }
    }
  }
}
</style>