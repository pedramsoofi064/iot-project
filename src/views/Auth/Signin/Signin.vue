<template>
  <section class="signin">
    <h1 class="auth__title">ورود به داشبورد  </h1>
    <div class="main">
      <ValidationObserver v-slot="{handleSubmit}">
        <form class="form" @submit.prevent="handleSubmit(login)">
          <ValidationProvider class="form-field" name="شماره همراه" rules="required|isMobile" v-slot="{errors}">
            <span class="field__title">شماره همراه </span>
            <div class="field__input">
              <input type="text" v-model="model.phoneNumber"  />
            </div>
            <span class="field__error" v-if="errors.length">{{errors[0]}}</span>
          </ValidationProvider>
          <ValidationProvider class="form-field" name=" رمز عبور" rules="required" v-slot="{errors}">
            <span class="field__title"> رمز عبور </span>
            <div class="field__input">
              <input type="password" v-model="model.password"  />
            </div>
            <span class="field__error" v-if="errors.length">{{errors[0]}}</span>
            <span class="resend" @click="$router.push('/account/forget-password')">فراموشی رمز عبور  </span>
          </ValidationProvider>
          <div class="form-action">
            <v-btn color="primary" type="submit" :loading="loading">ورود</v-btn>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <div class="footer">
      <span class="text-1">تا کنون وارد نشده اید؟</span>
      <span class="text-2" @click="$router.push('/account/signup')">ثبت نام کنید</span>
    </div>
  </section>
</template>

<script src='./Signin.js'>
</script>

<style lang="scss" src="./Signin.scss">
</style>