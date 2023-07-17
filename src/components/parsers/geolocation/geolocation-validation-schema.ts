import { array, object, string } from 'yup';
import { ValidationErrors } from '../../../consts/validation';

export const geolocationValidation = object({
  name: string().required(ValidationErrors.required),
  radius: string().required(),
  marker: array().required(ValidationErrors.mapValidation.noMarkers),
});
