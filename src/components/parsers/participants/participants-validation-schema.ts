import { array, number, object, string } from 'yup';
import { ValidationErrors } from '../../../consts/validation';

export const participantsValidation = object({
  name: string().required(ValidationErrors.required),
  groups: array().of(
    object({
      id: string(),
      value: string().required(ValidationErrors.required),
    }),
  ),
  amountFrom: number()
    .required(ValidationErrors.required)
    .typeError(ValidationErrors.numberValidation.numberType)
    .min(1, ValidationErrors.numberValidation.minNumber(1)),
});
