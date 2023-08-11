import { array, object, string } from 'yup';
import { TASK_NAME_REGEX, ValidationErrors } from '../../../consts/validation';

export const geolocationValidation = object({
  name: string()
    .required(ValidationErrors.required)
    .matches(TASK_NAME_REGEX, ValidationErrors.taskName),
  radius: string().required(),
  marker: array().required(ValidationErrors.mapValidation.noMarkers),
});
