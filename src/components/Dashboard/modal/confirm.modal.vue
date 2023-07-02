<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="600"
    :title="title"
  >
    <div class="confirm-modal__message">{{ message }}</div>
    <div class="confirm-modal__actions">
      <v-btn color="primary" @click="$emit('confirm')">{{
        btnConfirm || "تایید"
      }}</v-btn>
      <v-btn color="primary" outlined @click="$emit('cancel')">{{
        btnCancel || "لغو"
      }}</v-btn>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";

export default {
  name: "confirm",
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
    message: {
      type: String,
      default: "",
    },
    btnConfirm: {
      type: String,
      default: "تایید",
    },
    btnCancel: {
      reqiure: false,
      type: String,
      default: "لغو",
    },
  },
  components: {
    BaseModal,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.confirm-modal__message {
  font-weight: 500;
  margin-bottom: 20px;
}
.confirm-modal__actions {
  display: flex;
  .v-btn {
    flex: 1;
    height: 40px;

    &:first-child {
      margin-left: 15px;
    }
  }
}
</style>