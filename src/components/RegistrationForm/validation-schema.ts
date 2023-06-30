import { object, ref, string } from 'yup';
import { PASS_REGEX } from '../../consts/consts';

export const registrationSchema = object({
  email: string()
    .required('Обязательное поле')
    .matches(
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      'Некорректный адрес электронной почты',
    ),
  password: string()
    .required('Обязательное поле')
    .matches(
      PASS_REGEX,
      'Пароль должен содержать в себе заглавную букву, спец. символ и цифру',
    )
    .min(8, 'Пароль должен содержать не менее 8 символов'),
  passwordCheck: string()
    .oneOf([ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});
