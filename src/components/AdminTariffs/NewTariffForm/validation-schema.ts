import { number, object, string } from 'yup';
import { ValidationErrors } from '../../../consts/validation';

export const tariffSchema = object().shape({
  name: string().required(ValidationErrors.required),
  limitation_days: number().required(ValidationErrors.required),
  price: number().required(ValidationErrors.required),
  options: object({
    simultaneousParsing: number().required(ValidationErrors.required),
    parsersPerDay: number().required(ValidationErrors.required),
  }),
});
