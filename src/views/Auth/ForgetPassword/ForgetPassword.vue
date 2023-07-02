<template>
  <section class="signup">
    <h1 class="auth__title"> فراموشی رمز عبور</h1>
    <div class="steps">
      <transition name="form-anim">
        <router-view />
      </transition>
    </div>
    <div class="footer">
      <span class="text-1">حساب کاربری دارید؟</span>
      <span class="text-2" @click="$router.push('/account/signin')">وارد شوید</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "signup",
  components: {
  },
};
</script>

<style lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  margin: 100px 50px 0 ;
  .auth__title {
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 45px;
    letter-spacing: 0em;
    text-align: center;
  }

  .steps {
    
    display: flex;
    margin-bottom: 25px;
    margin-top: 50px;
  }

  .footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .text-1 {
      //styleName: Desktop/Caption;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0em;
      text-align: center;
      color: var(--grey-6-middle);
    }

    .text-2 {
      margin-top: 10px;
      cursor: pointer;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 23px;
      letter-spacing: 0em;
      text-align: center;
      color: var(--primary-main);
    }
  }
}
.form-anim-leave-active,
.form-anim-enter-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease;
}

.form-anim-enter-active {
  transition-delay: 0.5s;
}

.form-anim-enter {
  transform: translateX(-100px);
  opacity: 0;
}

.form-anim-enter-to {
  transform: translateX(0px);
  opacity: 1;
}

.form-anim-leave {
  opacity: 1;
  transform: translateX(100px);
}

.form-anim-leave-to {
  opacity: 0;
  transform: translateX(150px);
}
</style>