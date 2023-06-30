import { object, string } from 'yup';
import { NAME_REGEX } from '../../../consts/consts';

export const mainDataValidation = object({
  email: string().email('Некорректный адрес электронной почты'),
  firstname: string()
    .min(2, 'Поле должно содержать не менее 2 символов')
    .matches(NAME_REGEX, 'Формат: "Иван"'),
  lastname: string()
    .min(2, 'Поле должно содержать не менее 2 символов')
    .matches(NAME_REGEX, 'Формат: "Иванов"'),
  phoneNumber: string().matches(
    /^[+]?[-\s.]?[0-9]{4,}$/,
    'Формат: "+79123456789"',
  ),
});
