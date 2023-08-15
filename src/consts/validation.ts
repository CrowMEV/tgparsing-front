export const ValidationErrors = {
  email: 'Некорректный адрес электронной почты',
  required: 'Обязательное поле',
  password:
    'Пароль должен содержать в себе не менее 8 символов, заглавную букву, спец. символ и цифру',
  passwordCheck: 'Пароли должны совпадать',
  phoneNumber: 'Номер должен начинаться с "+" и содержать от 4 до 14 символов',
  ruPhoneNumber: 'Номер должен начинаться с "+" и содержать 11 цифр',
  lastName: 'Формат: "Иванов"',
  firstName: 'Формат: "Иван"',
  taskName:
    'Имя задачи может содержать в себе только тире, подчеркивание и пробел',
  notImage: 'Неподдерживаемый формат изображения',
  chooseOne: 'Необходимо выбрать хотя бы одно значение',
  moreThan: (fieldName: string) =>
    `Значение должно быть больше чем ${fieldName}`,
  min: (value: number) => `Поле должно содержать не менее ${value} символов`,
  max: (value: number) => `Поле должно содержать не более ${value} символов`,

  numberValidation: {
    positive: 'Значение должно быть больше нуля',
    numberType: 'Поле должно содержать в себе только цифры',
    integerNumber: 'Значение должно быть целым числом',
    minNumber: (value: number) => `Значение должно быть не менее ${value}`,
    maxNumber: (value: number) => `Значение должно быть не более ${value}`,
    range: (min: number, max: number) =>
      `Значение должно быть не менее ${min} и не более ${max}`,
    withoutSymbols: 'Поле обязательно и не должно содержать символов "eE+-."',
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
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const PASS_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]|.*[_]).{8,}/;

export const NAME_LENGTH = 61;

export const NAME_REGEX =
  /^(([а-яА-ЯёЁ][а-яё]*)(-[а-яА-ЯёЁ][а-яё]*)?)|(([a-zA-Z][a-z]*)(-[a-zA-Z][a-z]*)?)$/;

export const PHONE_REGEX = /^\+[0-9+][0-9()-]{4,14}\d$/;
export const RU_PHONE_REGEX = /^\+7[0-9]{10}$/;

export const NUMBER_ONLY_REGEX = /^\d+$/;

export const TASK_NAME_REGEX = /^[А-ЯЁа-яёA-Za-z0-9-_ ]{1,50}$/;

export const NUMBER_SYMBOLS = /[eE+\-.]/;
