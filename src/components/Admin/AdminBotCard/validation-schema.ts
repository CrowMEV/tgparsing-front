import { object, string } from 'yup';
import { ValidationErrors } from '../../../consts/validation';

export const adminBotCard = object({
  apiId: string().required(ValidationErrors.required),
  apiHash: string().required(ValidationErrors.required),
  phoneNumber: string().required(ValidationErrors.required),
});
