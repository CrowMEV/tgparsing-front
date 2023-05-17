import { object, ref, string } from 'yup';

export const loginSchema = object().shape({
  email: string()
    .required('Обязательное поле')
    .email('Некорректный адрес электронной почты'),
  password: string()
    .required('Обязательное поле')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
});

export const registrationSchema = object({
  firstName: string()
    .required('Обязательное поле')
    .min(2, 'Поле "имя" должно содержать не менее 2 символов'),
  email: string()
    .required('Обязательное поле')
    .email('Некорректный адрес электронной почты'),
  telegramId: string()
    .required('Обязательное поле')
    .min(5, 'Ник в Telegram должен содержать не менее 5 символов')
    .max(32, 'Ник в Telegram не должен превышать 32 символа'),
  password: string()
    .required('Обязательное поле')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
  passwordCheck: string()
    .oneOf([ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});
