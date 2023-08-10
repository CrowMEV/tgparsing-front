import { object, string } from 'yup';
import { NUMBER_ONLY_REGEX, ValidationErrors } from '../../consts/validation';

export const replenishmentSchema = object().shape({
  amount: string()
    .required(ValidationErrors.required)
    .matches(NUMBER_ONLY_REGEX, ValidationErrors.numberValidation.numberType)
    .test({
      message: ValidationErrors.numberValidation.minNumber(1),
      test: (value) => 0 < Number(value),
    }),
});
