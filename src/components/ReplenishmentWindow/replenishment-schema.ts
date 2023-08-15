import { object, number } from 'yup';
import { NUMBER_SYMBOLS, ValidationErrors } from '../../consts/validation';

export const replenishmentSchema = object().shape({
  amount: number()
    .typeError(ValidationErrors.numberValidation.numberType)
    .required(ValidationErrors.required)
    .test({
      message: ValidationErrors.numberValidation.withoutSymbols,
      test: (value) =>
        typeof value === 'number' && !NUMBER_SYMBOLS.test(value.toString()),
    }),
});
