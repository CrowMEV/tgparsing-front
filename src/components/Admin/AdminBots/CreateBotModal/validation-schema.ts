import { object, string } from 'yup';
import {
  NUMBER_ONLY_REGEX,
  ValidationErrors,
} from '../../../../consts/validation';

const NUMBER_LENGTH = 11;

export const createBotValidation = object({
  apiId: string().required(ValidationErrors.required),
  apiHash: string().required(ValidationErrors.required),
  phoneNumber: string()
    .required(ValidationErrors.required)
    .min(NUMBER_LENGTH, ValidationErrors.exactLength(NUMBER_LENGTH))
    .max(NUMBER_LENGTH, ValidationErrors.exactLength(NUMBER_LENGTH))
    .matches(NUMBER_ONLY_REGEX, ValidationErrors.numberValidation.numberType),
});

export const verificationCodeValidation = object({
  code: string().required(ValidationErrors.required),
});
