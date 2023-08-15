import { AxiosError } from 'axios';

type PydanticError = {
  detail: [
    {
      loc: string[];
      msg: string;
      type: string;
    },
  ];
};

type DefaultError = {
  detail: string;
};

export const getErrorMessage = (
  error: AxiosError<PydanticError | DefaultError>,
) => {
  const errorBody = error.response?.data.detail;
  if (!errorBody) return error.message;

  if (typeof errorBody === 'string') return errorBody;
  if (errorBody instanceof Array) return errorBody[0].msg;
};
