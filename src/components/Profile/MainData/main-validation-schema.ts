import { mixed, object, string } from 'yup';
import {
  EMAIL_REGEX,
  NAME_LENGTH,
  NAME_REGEX,
  PHONE_REGEX,
  ValidationErrors,
} from '../../../consts/validation';
import { isTypesCorrect } from '../../../utils/fileValidation';

export const mainDataValidation = object({
  email: string().matches(EMAIL_REGEX, ValidationErrors.email),
  firstname: string()
    .min(2, ValidationErrors.min(2))
    .max(NAME_LENGTH, ValidationErrors.max(NAME_LENGTH))
    .matches(NAME_REGEX, ValidationErrors.firstName),
  lastname: string()
    .min(2, ValidationErrors.min(2))
    .max(NAME_LENGTH, ValidationErrors.max(NAME_LENGTH))
    .matches(NAME_REGEX, ValidationErrors.lastName),
  phone_number: string()
    .nullable()
    .matches(PHONE_REGEX, ValidationErrors.phoneNumber),
  picture: mixed().test({
    test: (file) => isTypesCorrect(file as File, ['image/png', 'image/jpeg']),
    message: ValidationErrors.notImage,
  }),
});
