<template>
  <section class="signup-step2">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(changePass)">
        <ValidationProvider
          class="form-field"
          name="رمز عبور"
          rules="required"
          v-slot="{ errors }"
        >
          <span class="field__title">رمز عبور</span>
          <div class="field__input">
            <input type="password" v-model="model.newPassword" />
          </div>
          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider
          class="form-field"
          name="کد"
          rules="required"
          v-slot="{ errors }"
        >
          <span class="field__title"
            >کد تایید ارسال شده به شماره {{ mobile }}</span
          >
          <div class="field__input">
            <input type="text" v-model="model.code" placeholder="******" />
          </div>
          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>
        <div class="form-action">
          <v-btn color="primary" :loading="loading" type="submit">بعدی</v-btn>
          <v-btn
            color="primary"
            outlined
            @click="$router.push('/account/signup/step1')"
            >بازگشت</v-btn
          >
        </div>
      </form>
    </ValidationObserver>
  </section>
</template>


<script src="./ForgetPassword.Step2.js">
</script>

<style lang="scss" src="./ForgetPassword.Step2.scss">
</style>