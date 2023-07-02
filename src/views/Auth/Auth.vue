<template>
  <section class="auth">
    <img class="img1" src="@/assets/images/footer-pattern-dark.png" alt="">
    <img class="img2" src="@/assets/images/footer-pattern-dark.png" alt="">
    <div class="left">
      <router-view />
    </div>
  </section>
</template>

<script>
export default {
  name: "auth",
  components: {
  },
};
</script>

<style lang="scss">
.auth {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  > .img1 {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
  }
  > .img2 {
    position: absolute;
    right:  0;
    top: 0;
    transform: rotate(180deg);
    z-index: 1;

  }
  .rigth {
    width: 40%;
    display: flex;
    justify-content: center;
    background-color: #F3F9FF;
    position: relative;
    margin: 50px;
    border-radius: 72px;
    overflow: hidden;

    .top-line,
    .bottom-line {
      position: absolute;
      width: 400px;
      right: 0;
    }
    .bottom-line {
      bottom: 0;
    }
    .container {
      flex: 1;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 150px 50px;

      .logo-container {
        text-align: right;
      }

      .text {
        //styleName: Desktop/H6;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        text-align: right;
        margin-top: 20px;
      }


      .illustration {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 120px;
      }
    }
  }

  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    z-index: 5;
  }
}
</style>