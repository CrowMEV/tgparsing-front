import { boolean, object, ref, string } from 'yup';
import { PASS_REGEX, ValidationErrors } from '../../../consts/validation';

export const passDataValidation = object({
  currentPass: string().required(ValidationErrors.required),
  currentPassValidity: boolean().isTrue(),
  newPass: string()
    .required(ValidationErrors.required)
    .matches(PASS_REGEX, ValidationErrors.password),
  newPassConfirm: string()
    .required(ValidationErrors.required)
    .oneOf([ref('newPass')], ValidationErrors.passwordCheck),
});
