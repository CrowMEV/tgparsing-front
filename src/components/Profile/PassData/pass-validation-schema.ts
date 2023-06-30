import { object, string } from 'yup';
import { PASS_REGEX } from '../../../consts/consts';

export const passDataValidation = object({
  currentPass: string().required('Обязательное поле'),
  newPass: string()
    .required('Обязательное поле')
    .matches(
      PASS_REGEX,
      'Пароль должен содержать в себе заглавную букву, спец. символ и цифру',
    ),
  newPassConfirm: string()
    .required('Обязательное поле')
    .matches(
      PASS_REGEX,
      'Пароль должен содержать в себе заглавную букву, спец. символ и цифру',
    ),
});
