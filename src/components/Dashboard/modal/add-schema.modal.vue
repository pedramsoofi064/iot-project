<template>
  <BaseModal
    :show="show"
    :maxWidth="800"
    @close="$emit('close')"
    title="طراحی صفحه خانه"
  >
    <div class="schema-modal">
      <div>
        <ul class="schema-modal__rules">
          <li>
            برای نمایش هر آیتم در صفحه خانه آن را کلیک نمایید.
          </li>
          <li>
            باکلیک و کشیدن آیتم ها در صفحه ترتیب قرار گیری آن ها را تغییر دهید.
          </li>
          <li>انتخاب حداقل چهار مورد ضروری می‌باشد.</li>
        </ul>
        <v-btn color="primary" disabled outlined large>مشاهده پیش‌نمایش</v-btn>
      </div>
      <draggable
        class="draggble"
        v-model="draggbleItems"
        group="people"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group name="fade">
          <div
            v-for="element in draggbleItems"
            :key="element.id"
            class="draggble-item"
            @click="handleDraggbleItem(element)"
            :class="{ active: activeItems.includes(element.id) }"
          >
            <div class="draggble-item__header">
              <span class="draggble-item__name">{{ element.text }}</span>
              <dreaggbleSvg />
            </div>
            <div
              v-if="element.id == 5 && activeItems.includes(5)"
              class="draggble-item__uploader"
            >
              <div class="draggble-item__images">
                <div
                  v-for="(image, index) in images"
                  :key="`image${index}`"
                  class="draggble-item__image"
                >
                  <span class="image-index">{{ `${index + 1}.` }}</span>
                  <img :src="createFileUrl(image.file)" alt="" />
                  <span class="file-name">{{ image.name }}</span>
                  <span class="delete-image" @click.stop="deleteImage(image.id)">
                    <CloseSvg />
                  </span>
                </div>
              </div>
              <div class="draggble-item__add">
                <v-btn color="primary" outlined @click.stop="uploadFile()">
                  <span>افزودن بنر </span>
                  <AddSvg />
                </v-btn>
                <input
                  type="file"
                  style="display:none"
                  ref="uploader1"
                  @change="onUpload($event)"
                />
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
      <div class="schema-modal__action">
        <v-btn color="primary" large>ایجاد صفحه خانه</v-btn>
        <v-btn color="primary" outlined large>لغو</v-btn>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/Dashboard/modal/modal.component.vue";
import draggable from "vuedraggable";
import dreaggbleSvg from "@/assets/svg/ic_maximize.svg";
import AddSvg from "@/assets/svg/ic_add.svg";
import CloseSvg from "@/assets/svg/ic_close-square.svg";

export default {
  name: "schemaModal",
  props: {
    show: {
      reqiure: true,
      type: Boolean,
      default: false
    },
    data: {
      reqiure: true,
      type: Object,
      default: () => {}
    }
  },
  components: {
    BaseModal,
    draggable,
    dreaggbleSvg,
    AddSvg,
    CloseSvg
  },
  data() {
    return {
      activeItems: [5],
      myArray: [],
      images: [],
      draggbleItems: [
        {
          id: 1,
          text: "نمایش پر بازدیدترین‌های اخیر"
        },
        {
          id: 2,

          text: "نمایش دسته بندی کالاها"
        },
        {
          id: 3,

          text: "(کالاهای دارای تخفیف)نمایش پیشنهاد شگفت انگیز"
        },
        {
          id: 4,

          text: "نمایش پر فروش ترین‌های اخیر"
        },
        {
          id: 5,

          text: "افزودن بنر تبلیغاتی"
        }
      ]
    };
  },
  methods: {
    handleDraggbleItem(element) {
      if (this.activeItems.includes(element.id)) {
        this.activeItems = this.activeItems.filter(item => item != element.id);
      } else {
        this.activeItems.push(element.id);
      }
    },
    uploadFile() {
      // console.log(this.$refs);
      this.$refs.uploader1[0].click();
      this.activeItems.push(5);
    },
    onUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.images.push({
        id: Math.ceil(Math.random() * 1000),
        name: files[0].name,
        file: files[0]
      });
    },
    createFileUrl(file) {
      return file ? URL.createObjectURL(file) : "";
    },
    deleteImage(id){
      this.images = this.images.filter(item => item.id != id)
    }
  }
};
</script>

<style lang="scss" scoped>
.schema-modal {
  $self: &;

  #{$self}__rules {
    padding-right: 20px;
    margin-bottom: 20px;
    li {
      margin-bottom: 10px;
      font-weight: 500;
    }
  }

  #{$self}__action {
    display: flex;
    margin-top: 35px;
    .v-btn {
      flex: 1;
      &:first-child {
        margin-left: 20px;
      }
    }
  }

  .draggble {
    margin-top: 50px;
    padding: 0 15px;
    // max-height: 500px;
  }

  .draggble-item {
    display: flex;
    min-height: 80px;
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid var(--grey-3);
    box-sizing: border-box;
    border-radius: 24px;
    // cursor: pointer;
    padding: 0 30px;
    &__header {
      height: 80px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }

    &__name {
      font-weight: 500;
      color: var(--grey-5);
    }

    &.active {
      border-color: var(--primary-main);
      .draggble-item__header {
        span {
          color: var(--primary-main);
        }
        svg {
          path {
            fill: var(--primary-main);
          }
        }
      }
    }

    &__uploader {
      margin-bottom: 15px;

      .draggble-item__add {
        svg {
          path {
            fill: var(--primary-main);
          }
        }
      }
    }

    &__images {
      border-bottom: 1px solid var(--primary-main);
      margin-bottom: 15px;
      padding: 0 15px;
    }

    &__image {
      display: flex;
      height: 60px;
      align-items: center;
      margin-bottom: 15px;
      .image-index {
        margin-left: 30px;
        font-weight: 700;
      }
      img {
        height: 100%;
        margin-left: 15px;
        max-width: 250px;
        object-fit: contain;
      }

      .file-name {
        font-size: 14px;
      }
      .delete-image {
        margin-right: auto;
        cursor: pointer;

        svg:hover {
          path {
            fill: var(--cover-orange-dark);
          }
        }
      }
    }
  }
}
</style>
