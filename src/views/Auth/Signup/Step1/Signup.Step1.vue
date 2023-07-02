<template>
  <section class="signup-step1">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(signup)">
        <!-- <ValidationProvider
            class="form-field"
            name="تاریخ تولد"
            rules="required"
            v-slot="{ errors }"
          >
            <span class="field__title">تاریخ تولد</span>
            <div class="field__input">
              <input
                type="text"
                v-model="model.birthDate"
                id="my-custom-input"
              />
              <date-picker
                v-model="model.birthDate"
                format="jYYYY/jMM/jDD"
                element="my-custom-input"
                color="var(--primary-main)"
              />
              <calendarSvg />
            </div>

            <span class="field__error" v-if="errors.length">{{
              errors[0]
            }}</span>
          </ValidationProvider> -->
        <ValidationProvider
          class="form-field"
          name="شماره همراه"
          rules="required|isMobile"
          v-slot="{ errors }"
        >
          <span class="field__title">شماره همراه</span>
          <div class="field__input">
            <input type="text" v-model="model.phoneNumber" />
          </div>
          <span class="field__error" v-if="errors.length">{{ errors[0] }}</span>
        </ValidationProvider>

        <div class="form-action">
          <v-btn color="primary" type="submit" :loading="loading">بعدی</v-btn>
        </div>
      </form>
    </ValidationObserver>
  </section>
</template>

<script src="./Signup.Step1.js">
</script>

<style lang="scss" src="./Signup.Step1.scss">
</style>