import { object, string } from 'yup';
import { EMAIL_REGEX } from '../../consts/consts';

export const recoverySchema = object().shape({
  email: string()
    .required('Обязательное поле')
    .matches(EMAIL_REGEX, 'Некорректный адрес электронной почты'),
});
