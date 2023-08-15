import { object, string } from 'yup';
import {
  RU_PHONE_REGEX,
  ValidationErrors,
} from '../../../../consts/validation';

export const createBotValidation = object({
  apiId: string().required(ValidationErrors.required),
  apiHash: string().required(ValidationErrors.required),
  phoneNumber: string()
    .required(ValidationErrors.required)
    .matches(RU_PHONE_REGEX, ValidationErrors.ruPhoneNumber),
});

export const verificationCodeValidation = object({
  code: string().required(ValidationErrors.required),
});
