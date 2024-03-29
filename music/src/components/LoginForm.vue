<template>
  <div
    class="text-white text-center font-bold p-4 mb4"
    v-if="login_show_alert" :class="login_alert_variant">
    {{login_alert_msg}}
  </div>
  <VeeForm :validation-schema="loginSchema" @submit="logIn">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.email') }}</label>
      <VeeField type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                v-bind:placeholder="$t('user.email')" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.password') }}</label>
      <VeeField name="password" :bails="false" v-slot="{ field, errors }">
        <input class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                 transition duration-500 focus:outline-none focus:border-black rounded"
               type="password" v-bind="field"
               v-bind:placeholder="$t('user.password')" />
        <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
      </VeeField>
    </div>
    <button type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700" :disabled="login_in_submission">
      {{ $t('loginform.submit') }}
    </button>
  </VeeForm>

</template>
<script>

export default {
  name: 'LoginForm',
  data() {
    return {
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: this.$i18n.t('loginform.logging-in'),
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6|max:100',
      },
    };
  },
  methods: {
    async logIn(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      this.login_alert_variant = 'bg-blue-500';
      this.login_alert_msg = this.$i18n.t('loginform.logging-in');

      try {
        await this.$store.dispatch('login', values);
      } catch (e) {
        this.login_in_submission = false;
        this.login_alert_variant = 'bg-red-500';
        this.login_alert_msg = e.message
          ? e.message
          : this.$i18n.t('loginform.invalid-loggin-datails');
        return;
      }

      this.login_alert_variant = 'bg-green-500';
      this.login_alert_msg = this.$i18n.t('loginform.success-loggin-message');
      window.location.reload();
    },
  },
};
</script>
