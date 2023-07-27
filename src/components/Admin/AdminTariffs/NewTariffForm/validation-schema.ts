import { number, object, string } from 'yup';
import { ValidationErrors } from '../../../../consts/validation';

export const tariffSchema = object().shape({
  name: string().required(ValidationErrors.required),
  limitation_days: number()
    .positive(ValidationErrors.numberValidation.positive)
    .integer(ValidationErrors.numberValidation.integerNumber)
    .required(ValidationErrors.required),
  price: number()
    .positive(ValidationErrors.numberValidation.positive)
    .integer(ValidationErrors.numberValidation.integerNumber)
    .required(ValidationErrors.required),
  options: object({
    simultaneousParsing: number()
      .positive(ValidationErrors.numberValidation.positive)
      .integer(ValidationErrors.numberValidation.integerNumber)
      .required(ValidationErrors.required),
    parsersPerDay: number()
      .positive(ValidationErrors.numberValidation.positive)
      .integer(ValidationErrors.numberValidation.integerNumber)
      .required(ValidationErrors.required),
  }),
});
