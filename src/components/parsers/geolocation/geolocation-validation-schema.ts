import { array, object, string } from 'yup';
import { ValidationErrors } from '../../../consts/validation';

export const geolocationValidation = object({
  name: string().required(ValidationErrors.required),
  radius: string().required(),
  markers: array().required().min(1, ValidationErrors.mapValidation.noMarkers),
});
