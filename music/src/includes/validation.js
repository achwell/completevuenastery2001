import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from 'vee-validate';
import {
  alpha_spaces as alphaSpaces,
  confirmed,
  email,
  max,
  max_value as maxVal,
  min,
  min_value as minVal,
  not_one_of as excluded,
  required,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('email', email);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('password_mismatch', confirmed);
    defineRule('excluded', excluded);
    defineRule('country_excluded', excluded);
    defineRule('tos', required);

    configure({
      generateMessage: ({ rule, field }) => {
        const param = rule.params ? rule.params[0] : '';
        const messages = {
          required: `The field ${field} is required.`,
          min: `The field ${field} must be at least ${param} characters.`,
          max: `The field ${field} can not be more than ${param} characters.`,
          alpha_spaces: `The field ${field} may only contail alphabetic characters and spaces.`,
          email: `The field ${field} must be a valid email.`,
          min_value: `The field ${field} must be higher than or equal to ${param}.`,
          max_value: `The field ${field} must be lower than or equal to ${param}.`,
          password_mismatch: 'The passwords does not match.',
          excluded: `You are not allowed to use this value for the field ${field}.`,
          country_excluded: 'Due to restrictions, we do not accept users from this location.',
          tos: 'You must accept the Terms of Service.',
        };
        return messages[rule.name]
          ? messages[rule.name]
          : `The field ${field} is invalid.`;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
