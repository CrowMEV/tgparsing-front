import { object, string } from 'yup';

export const loginSchema = object().shape({
  email: string()
    .required('Обязательное поле')
    .email('Некорректный адрес электронной почты'),
  password: string()
    .required('Обязательное поле')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
});
