export const ValidationErrors = {
  email: 'Некорректный адрес электронной почты',
  required: 'Обязательное поле',
  password:
    'Пароль должен содержать в себе не менее 8 символов, заглавную букву, спец. символ и цифру',
  passwordCheck: 'Пароли должны совпадать',
  phoneNumber: 'Номер должен начинаться с "+" и содержать от 4 до 14 символов',
  lastName: 'Формат: "Иванов"',
  firstName: 'Формат: "Иван"',
  moreThan: (fieldName: string) =>
    `Значение должно быть больше чем ${fieldName}`,
  min: (value: number) => `Поле должно содержать не менее ${value} символов`,
  max: (value: number) => `Поле должно содержать не более ${value} символов`,
  notImage: 'Неподдерживаемый формат изображения',
  chooseOne: 'Необходимо выбрать хотя бы одно значение',

  numberValidation: {
    positive: 'Значение должно быть больше нуля',
    numberType: 'Поле должно содержать в себе только цифры',
    minNumber: (value: number) => `Значение должно быть больше ${value}`,
    maxNumber: (value: number) => `Значение должно быть меньше ${value}`,
    integerNumber: 'Значение должно быть целым числом',
  },

  dateValidation: {
    futureDate: 'Дата не может быть из будущего',
    earlier: 'Дата конца не может быть раньше даты начала',
  },

  mapValidation: {
    noMarkers: 'Необходимо отметить точку на карте',
  },
};

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]|.*[_]).{8,}/;

export const NAME_REGEX = /^([А-ЯЁ]{0,1}[а-яё-]+|[A-Z]{0,1}[a-z-]+)$/;

export const PHONE_REGEX = /^\+[0-9+][0-9()-]{4,14}\d$/;

export const NUMBER_ONLY_REGEX = /^\d+$/;
