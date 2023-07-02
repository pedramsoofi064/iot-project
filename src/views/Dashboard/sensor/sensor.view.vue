<template>
  <div class="page">
    <div class="page__header">
      <h1>سنسور ها</h1>
      <div class="page__create" @click="addSensor()">
        <addSvg />
        <span>افزودن سنسور </span>
      </div>
    </div>
    <div class="page__items">
      <template v-if="getLoading"> در حال بارگیری ... </template>
      <template v-else>
        <template v-if="sensors.length">
          <div class="page__item" v-for="(item, index) in sensors" :key="index">
            <div class="item__image">
              <server1Icon />
            </div>
            <div class="item__info">
              <span>نام:</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="item__info">
              <span> آی پی:</span>
              <span>{{ item.ipv4 }}</span>
            </div>
            <div class="item__info">
              <span>مک آدرس:</span>
              <span>{{ item.macAddress }}</span>
            </div>

            <div class="item__info">
              <span> نسخه:</span>
              <span>{{ item.version }}</span>
            </div>

            <div class="item__action">
              <span
                class="item__delete"
                @click="$router.push(`/dashboard/sensor/${item._id}`)"
              >
                <previewSvg></previewSvg>
              </span>
              <span class="item__edit" @click="edit(item)">
                <editSVG></editSVG>
              </span>
              <span class="item__delete" @click="deleteSensor(item)">
                <deleteSvg></deleteSvg>
              </span>
            </div>
          </div>
        </template>
        <template v-else> سنسوری یافت نشد </template>
      </template>
    </div>

    <base-modal
      :show="dialog"
      @close="dialog = false"
      :maxWidth="700"
      :title="`${mode === 'add' ? 'افزودن' : 'ویرایش'} سنسور`"
    >
      <div>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
          <form class="form" @submit="handleSubmit(add)">
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <ValidationProvider
                  name="نام"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="نام"
                    variant="underlined"
                    v-model="model.name"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <ValidationProvider
                  name="مک آدرس (mac address)"
                  rules="required|macAddress"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="مک آدرس (mac address)"
                    variant="underlined"
                    v-model="model.macAddress"
                    :error-messages="errors[0]"
                    :disabled="mode == 'edit'"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <ValidationProvider
                  name="آی پی (ip v4)"
                  rules="required|ipv4"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="آی پی (ip v4)"
                    variant="underlined"
                    v-model="model.ipv4"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <ValidationProvider
                  name="نسخه"
                  rules="required|version"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    label="نسخه"
                    variant="underlined"
                    v-model="model.version"
                    hint="برای مثال v1.0.0"
                    :error-messages="errors[0]"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" v-if="mode == 'add'">
                <ValidationProvider
                  name="مد"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-select
                    :items="modes"
                    label="مد "
                    v-model="model.modeID"
                    item-text="title"
                    item-value="value"
                    :error-messages="errors[0]"
                  ></v-select>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" class="mode-desc" v-if="mode == 'add'">
                <span
                  >مد1: عملکرد درمد لوکال بدون اتصال به اینترنت، ارسال از طریق
                  App موبایل</span
                >
                <span
                  >مد2: عملکرد درمد لوکال بدون اتصال به اینترنت با تفکیک ساعتی
                  داده های اندازه گیری شده، ارسال از طریق App موبایل</span
                >
                <span>
                  مد3: اتصال به گیت وی و ارسال داده های اندازه گیری شده از طریق
                  گیت وی
                </span>
                <span>
                  مد4: اتصال به اینترنت (وای فای) و ارسال مستقیم به سرور
                </span>
              </v-col>
              <v-col cols="12" sm="12">
                <v-btn color="primary" block @click="add">ثبت</v-btn>
              </v-col>
            </v-row>
          </form>
        </ValidationObserver>
      </div>
    </base-modal>

    <confirmModal
      :show="deleteConfirmDialog"
      title="حذف سنسور"
      message="آیا می خواهید سنسور را حذف کنید"
      @cancel="deleteConfirmDialog = false"
      @close="deleteConfirmDialog = false"
      @confirm="deleteSensorConfirm()"
    ></confirmModal>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import addSvg from "@/assets/svg/ic_add-circle.svg";
import server1Icon from "@/assets/svg/ic_server.svg";
import editSVG from "@/assets/svg/ic_edit.svg";
import deleteSvg from "@/assets/svg/ic_delete_linear.svg";
import previewSvg from "@/assets/svg/preview.svg";
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
import sensorServices from "./sensor.services";
import confirmModal from "@/components/Dashboard/modal/confirm.modal.vue";

export default {
  name: "sensor",

  components: {
    addSvg,
    server1Icon,
    BaseModal,
    ValidationObserver,
    ValidationProvider,
    editSVG,
    deleteSvg,
    confirmModal,
    previewSvg,
  },
  data() {
    return {
      dialog: false,
      mode: "add",
      modes: [
        { title: "مد 1", value: 1 },
        { title: "مد 2", value: 2 },
        { title: "مد 3", value: 3 },
        { title: "مد 4", value: 4 },
      ],
      createLoading: false,
      getLoading: false,
      model: {
        macAddress: "6E-4C-10-48-47-E5",
        ipv4: "1.1.1.1",
        name: "test",
        version: "v0.0.1",
        modeID: 1,
        // macAddress: "",
        // ipv4: "",
        // name: "",
        // version: "",
        // modeID: null,
      },
      sensors: [],
      selected: null,
      deleteConfirmDialog: false,
    };
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.model = {
          macAddress: "",
          ipv4: "",
          name: "",
          version: "",
          modeID: null,
        };
        this.$refs.form.reset();
      }
    },
  },
  mounted() {
    this.getAll();
  },
  methods: {
    async getAll() {
      this.getLoading = true;
      try {
        const { data } = await sensorServices.getAll();
        this.sensors = data;
      } catch {
        this.$toast.error("خطایی رخ داد");
      } finally {
        this.getLoading = false;
      }
    },
    async add() {
      console.log(await this.$refs.form.validate());
      if (!(await this.$refs.form.validate())) {
        return;
      }

      this.createLoading = true;
      try {
        if (this.mode === "add") {
          await sensorServices.create(this.model);
        } else {
          await sensorServices.edit(this.selected._id, {
            name: this.model.name,
            version: this.model.version,
            ipv4: this.model.ipv4,
          });
        }
        this.dialog = false;
        await this.getAll();
      } catch (err) {
        if (
          err.response.data.message ==
          "A node with this MAC address already exists"
        ) {
          this.$toast.error("مک آدرس در سامانه تکراری می باشد");
        } else this.$toast.error("خطایی رخ داد");
      } finally {
        this.createLoading = false;
      }
    },
    addSensor() {
      this.mode = "add";
      this.dialog = true;
    },
    edit(item) {
      this.mode = "edit";
      this.model = {
        macAddress: item.macAddress,
        ipv4: item.ipv4,
        name: item.name,
        version: item.version,
      };
      this.selected = item;
      this.dialog = true;
    },
    deleteSensor(item) {
      console.log(item);
      this.selected = item;
      this.deleteConfirmDialog = true;
    },
    async deleteSensorConfirm() {
      try {
        await sensorServices.delete(this.selected._id);
        await this.getAll();
      } catch {
        this.$toast.error("خطایی رخ داد");
      } finally {
        this.deleteConfirmDialog = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__create {
    display: flex;
    align-items: center;
    color: var(--primary-lighter);
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      transition: all 0.5s;
    }
  }

  &__items {
    display: grid;
    margin-top: 25px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 15px;
  }

  &__item {
    padding: 15px;
    // border: 1px solid var(--grey-3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4), 4px 4px 6px rgba(0, 0, 0, 0.15);
    transition: all 0.5s;
    position: relative;

    .item__image {
      display: flex;
      padding: 10px;
      border-radius: 50%;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4),
        4px 4px 6px rgba(0, 0, 0, 0.15);
      margin-bottom: 15px;
    }

    .item__info {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 12px;
      > span:nth-child(2) {
        color: var(--secondary-lighter);
      }
    }
    .item__action {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
    .item__edit,
    .item__delete {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.4),
        4px 4px 6px rgba(0, 0, 0, 0.15);
    }

    &:hover {
      // padding: 5px;
      background-color: rgba(255, 255, 255, 0.05);
      .item__edit,
      .item__delete {
        display: flex;
      }
    }
  }
}

.mode-desc {
  display: flex;
  flex-direction: column;
  span {
    font-size: 10px;
  }
}
</style>