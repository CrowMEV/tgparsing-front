import { object, string } from 'yup';
import { EMAIL_REGEX, ValidationErrors } from '../../consts/validation';

export const recoverySchema = object().shape({
  email: string()
    .required(ValidationErrors.required)
    .matches(EMAIL_REGEX, ValidationErrors.email),
});
