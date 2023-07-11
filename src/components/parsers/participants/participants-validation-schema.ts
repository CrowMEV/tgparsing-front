import { array, number, object, string } from 'yup';
import { ValidationErrors } from '../../../consts/validation';

export const participantsValidation = object({
  name: string().required(ValidationErrors.required),
  groups: array().of(
    object({
      id: number(),
      value: string().required(ValidationErrors.required),
    }),
  ),
  amountFrom: number()
    .required(ValidationErrors.required)
    .typeError(ValidationErrors.numberValidation.numberType)
    .min(1, ValidationErrors.numberValidation.minNumber(1)),
  amountTo: number()
    .required(ValidationErrors.required)
    .typeError(ValidationErrors.numberValidation.numberType)
    .min(1, ValidationErrors.numberValidation.minNumber(1))
    .when('amountFrom', (from, schema) => {
      return schema.test({
        test: (to) => to > from[0],
        message: ValidationErrors.moreThan('от'),
      });
    }),
});
