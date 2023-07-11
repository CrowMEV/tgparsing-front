import { object, ref, string } from 'yup';
import { PASS_REGEX, ValidationErrors } from '../../../consts/validation';

export const passDataValidation = object({
  //TODO
  // currentPass: string().required(ValidationErrors.required),
  newPass: string()
    .required(ValidationErrors.required)
    .matches(
      PASS_REGEX,
      'Пароль должен содержать в себе заглавную букву, спец. символ и цифру',
    ),
  newPassConfirm: string()
    .required(ValidationErrors.required)
    .oneOf([ref('newPass')], ValidationErrors.passwordCheck),
});
