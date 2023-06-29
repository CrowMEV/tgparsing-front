import { object, string } from 'yup';

export const replenishmentSchema = object().shape({
  amount: string()
    .required('Обязательное поле')
    .matches(/^[0-9]*$/, 'Поле должно содержать только число')
    .test({
      message: 'Сумма должна быть не меньше 1 и не больше 50000',
      test: (value) => 0 < Number(value) && Number(value) <= 50000,
    }),
});
