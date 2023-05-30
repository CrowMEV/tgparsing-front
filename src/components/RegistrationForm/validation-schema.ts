import { object, ref, string } from 'yup';

export const registrationSchema = object({
  firstname: string()
    .required('Обязательное поле')
    .min(2, 'Поле "имя" должно содержать не менее 2 символов'),
  lastname: string()
    .required('Обязательное поле')
    .min(2, 'Поле "фамилия" должно содержать не менее 2 символов'),
  email: string()
    .required('Обязательное поле')
    .email('Некорректный адрес электронной почты'),
  password: string()
    .required('Обязательное поле')
    .matches(
      /([0-9]+\S*[A-Z]+|[A-Z]+\S*[0-9]+)\S*([!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]+)/,
      'Пароль должен содержать в себе заглавную букву, спец. символ и цифру',
    )
    .min(8, 'Пароль должен содержать не менее 8 символов'),
  passwordCheck: string()
    .oneOf([ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
});
