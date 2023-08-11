import { array, date, number, object, ref, string } from 'yup';
import { TASK_NAME_REGEX, ValidationErrors } from '../../../consts/validation';

export const activitiesValidation = object({
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
    .min(1, ValidationErrors.numberValidation.minNumber(1)),
  // amountTo: number()
  //   .required(ValidationErrors.required)
  //   .typeError(ValidationErrors.numberValidation.numberType)
  //   .min(1, ValidationErrors.numberValidation.minNumber(1))
  //   .when('amountFrom', (from, schema) => {
  //     return schema.test({
  //       test: (to) => to > from[0],
  //       message: ValidationErrors.moreThan('от'),
  //     });
  //   }),
  activities: array().min(1, ValidationErrors.chooseOne),
  startDate: date()
    .required(ValidationErrors.required)
    .max(new Date(), ValidationErrors.dateValidation.futureDate),
  endDate: date()
    .required(ValidationErrors.required)
    .min(ref('startDate'), ValidationErrors.dateValidation.earlier),
});
