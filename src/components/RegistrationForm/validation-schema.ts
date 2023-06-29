import { object, ref, string } from 'yup';
import { EMAIL_REGEX } from '../../consts/consts';

export const registrationSchema = object({
  email: string()
    .required('Обязательное поле')
    .matches(EMAIL_REGEX, 'Некорректный адрес электронной почты'),
  password: string()
    .required('Обязательное поле')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]|.*[_]).{8,}/,
      'Пароль должен содержать в себе заглавную букву, спец. символ и цифру',
    )
    .min(8, 'Пароль должен содержать не менее 8 символов'),
  passwordCheck: string()
    .oneOf([ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});
