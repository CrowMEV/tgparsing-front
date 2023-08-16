import { number, object, string, boolean } from 'yup';
import {
  NUMBER_SYMBOLS,
  ValidationErrors,
} from '../../../../consts/validation';

export const tariffSchema = object().shape({
  name: string().required(ValidationErrors.required),
  limitation_days: number()
    .test(
      'err1',
      ValidationErrors.numberValidation.withoutSymbols,
      (value) => typeof value === 'number' && /^[0-9]*$/.test(value.toString()),
    )
    .positive(ValidationErrors.numberValidation.positive)
    .integer(ValidationErrors.numberValidation.integerNumber),
  price: number()
    .test(
      'err1',
      ValidationErrors.numberValidation.withoutSymbols,
      (value) =>
        typeof value === 'number' && !NUMBER_SYMBOLS.test(value.toString()),
    )
    .positive(ValidationErrors.numberValidation.positive)
    .integer(ValidationErrors.numberValidation.integerNumber),
  options: object({
    simultaneous_parsing: number()
      .test(
        'err1',
        ValidationErrors.numberValidation.withoutSymbols,
        (value) =>
          typeof value === 'number' && !NUMBER_SYMBOLS.test(value.toString()),
      )
      .positive(ValidationErrors.numberValidation.positive)
      .integer(ValidationErrors.numberValidation.integerNumber),
    parsers_per_day: number()
      .test(
        'err1',
        ValidationErrors.numberValidation.withoutSymbols,
        (value) =>
          typeof value === 'number' && !NUMBER_SYMBOLS.test(value.toString()),
      )
      .positive(ValidationErrors.numberValidation.positive)
      .integer(ValidationErrors.numberValidation.integerNumber),
    members: boolean(),
    activity: boolean(),
    geo: boolean(),
  }).test(
    'parsers-check',
    '',
    (options) => options.activity || options.geo || options.members,
  ),
});
