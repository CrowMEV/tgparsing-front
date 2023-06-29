import { object, string } from 'yup';
import { EMAIL_REGEX } from '../../consts/consts';

export const loginSchema = object().shape({
  email: string()
    .required('Обязательное поле')
    .matches(EMAIL_REGEX, 'Некорректный адрес электронной почты'),
  password: string()
    .required('Обязательное поле')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
});
