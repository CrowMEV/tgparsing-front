import { object, number } from 'yup';
import { ValidationErrors } from '../../consts/validation';

export const replenishmentSchema = object().shape({
  amount: number()
    .typeError(ValidationErrors.numberValidation.numberType)
    .required(ValidationErrors.required)
    .test({
      message: ValidationErrors.numberValidation.minNumber(1),
      test: (value) => 0 < Number(value),
    }),
});
