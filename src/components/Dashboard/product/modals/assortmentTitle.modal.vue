<template>
  <BaseModal
    :show="show"
    @close="$emit('close')"
    :maxWidth="600"
    :title="editMode ? 'تغییر عنوان دسته‌بندی' : 'دسته‌بندی جدید'"
  >
    <div class="assortmentTitle-modal__input">
      <v-text-field
        placeholder="عنوان دسته"
        v-model="title"
        outlined
      ></v-text-field>
    </div>
    <div class="assortmentTitle-modal__actions">
      <v-btn color="primary" @click="$emit('confirm')">{{
        editMode ? "تغییر عنوان" : "ایجاد دسته"
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
  name: "assortmentTitle",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    value: {
      reqiure: false,
      type: String,
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
    return {
      title: "",
    };
  },
  watch: {
    show(val) {
      if (val) {
        if (this.editMode) this.title = this.value;
        else this.title = ''
      }
    },
  },
  mounted() {
    if (this.editMode) this.title = this.value;
  },
};
</script>

<style lang="scss" scoped>
.assortmentTitle-modal__actions {
  display: flex;
  .v-btn {
    flex: 1;
    height: 40px;

    &:first-child {
      margin-left: 15px;
    }
  }
}

.assortmentTitle-modal__input {
  margin-bottom: 25px;
}
</style>