import { object, ref, string } from 'yup';

import {
  EMAIL_REGEX,
  PASS_REGEX,
  ValidationErrors,
} from '../../consts/validation';

export const registrationSchema = object({
  email: string()
    .required(ValidationErrors.required)
    .matches(EMAIL_REGEX, ValidationErrors.email),
  password: string()
    .required(ValidationErrors.required)
    .matches(PASS_REGEX, ValidationErrors.password)
    .min(8, ValidationErrors.min(8)),
  passwordCheck: string()
    .oneOf([ref('password')], ValidationErrors.passwordCheck)
    .required(ValidationErrors.required),
});
