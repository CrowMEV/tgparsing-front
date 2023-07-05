import { object, string } from 'yup';
import {
  EMAIL_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
  ValidationErrors,
} from '../../../consts/validation';

export const mainDataValidation = object({
  email: string().matches(EMAIL_REGEX, ValidationErrors.email),
  firstname: string()
    .min(2, ValidationErrors.min(2))
    .matches(NAME_REGEX, ValidationErrors.firstName),
  lastname: string()
    .min(2, ValidationErrors.min(2))
    .matches(NAME_REGEX, ValidationErrors.lastName),
  phoneNumber: string().matches(PHONE_REGEX, ValidationErrors.phoneNumber),
});
