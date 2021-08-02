<template>
  <div
    class="text-white text-center font-bold p-5 mb4"
    v-if="reg_show_alert" :class="reg_alert_variant">
    {{reg_alert_msg}}
  </div>
  <VeeForm :validation-schema="schema" @submit="register"
           :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.name') }}</label>
      <VeeField type="text" name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                v-bind:placeholder="$t('user.name')" />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.email') }}</label>
      <VeeField type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                v-bind:placeholder="$t('user.email')" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Phone -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.phone') }}</label>
      <VeeField type="tel" name="phone"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                v-bind:placeholder="$t('user.phone')" />
      <ErrorMessage class="text-red-600" name="phone" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.age') }}</label>
      <VeeField type="number" name="age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded" />
      <ErrorMessage class="text-red-600" name="age" />
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
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.confirm-password') }}</label>
      <VeeField type="password" name="confirmPassword"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
                v-bind:placeholder="$t('user.confirm-password')" />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('user.country') }}</label>
      <VeeField as="select" name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded">
        <option value="Antarctica">{{ $t('country.antarctica') }}</option>
        <option value="Norway">{{ $t('country.norway') }}</option>
        <option value="Germany">{{ $t('country.germany') }}</option>
        <option value="Mexico">{{ $t('country.mexico') }}</option>
        <option value="USA">{{ $t('country.usa') }}</option>
      </VeeField>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <VeeField name="tos" value="1" type="checkbox"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <i18n-t class="inline-block" keypath="register.accept" tag="label">
        <a href="#">{{ $t('register.TOS') }}</a>
      </i18n-t>

      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button type="submit"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700" :disabled="reg_in_submission">
      {{ $t('registerform.submit') }}
    </button>
  </VeeForm>

</template>
<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      userData: {
        country: 'Norway',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: this.$i18n.t('registerform.registering'),
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|email',
        phone: 'numeric|min:8|max:8',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:6|max:100',
        confirmPassword: 'password_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
    };
  },
  methods: {
    async register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = this.$i18n.t('registerform.registering');

      try {
        await this.$store.dispatch('register', values);
      } catch (e) {
        console.error(e);
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = e.message
          ? e.message
          : this.$i18n.t('default.error-message');
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = this.$i18n.t('registerform.success-registering-message');
      window.location.reload();
    },
  },
};
</script>
