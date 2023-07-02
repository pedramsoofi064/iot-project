<template>
  <div class="counter" :class="{disable: disabled}">
 
    <span class="counter__minus" @click="minus()">
      <minusSvg />
    </span>
    <span class="counter__value">{{ value }}</span>
    <span class="counter__plus" @click="plus()">
      <plusSvg />
    </span>
  </div>
</template>

<script>
import plusSvg from "@/assets/svg/ic_add.svg";
import minusSvg from "@/assets/svg/ic_minus.svg";
export default {
  name: "Counter",
  props: {
    value: {
      require: true,
      type: Number,
    },
    maxValue: {
      require: false,
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },
    disabled: {
      require: false,
      type: Boolean,
      default: false,
    },
  },
  components: {
    plusSvg,
    minusSvg,
  },
  methods: {
    plus() {
      if (this.value < this.maxValue) this.$emit("plus");
    },
    minus() {
      if (this.value > 0) this.$emit("minus");
    },
  },
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  width: 100%;
  overflow: hidden;
  &.disable {
      pointer-events: none;
      span {

          background-color: rgba($color: #000000, $alpha: 0.3);
      }
  }
  &__minus,
  &__plus {
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      svg {
        path {
          fill: var(--primary-main);
        }
      }
    }
  }

  .counter-disable {
      position: absolute;
      width: 99%;
      height: 99%;
      background-color: rgba($color: #000000, $alpha: 0.3);
  }

  &__value {
    font-weight: bold;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>