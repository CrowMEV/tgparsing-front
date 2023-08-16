import { array, number, object, string } from 'yup';
import {
  NUMBER_SYMBOLS,
  TASK_NAME_REGEX,
  ValidationErrors,
} from '../../../consts/validation';

export const participantsValidation = object({
  name: string()
    .required(ValidationErrors.required)
    .matches(TASK_NAME_REGEX, ValidationErrors.taskName),
  groups: array().of(
    object({
      id: string(),
      value: string().required(ValidationErrors.required),
    }),
  ),
  amountFrom: number()
    .required(ValidationErrors.required)
    .typeError(ValidationErrors.numberValidation.numberType)
    .max(5, ValidationErrors.numberValidation.maxNumber(5))
    .test({
      message: ValidationErrors.numberValidation.withoutSymbols,
      test: (value) =>
        typeof value === 'number' && !NUMBER_SYMBOLS.test(value.toString()),
    }),
});
