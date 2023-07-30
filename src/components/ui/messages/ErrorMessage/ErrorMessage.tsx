import { ReactNode } from 'react';
import { ReactComponent as ErrorIcon } from '../../../../assets/images/icons/error-icon.svg';

import sharedStyles from '../message.module.sass';

type ErrorMessageProps = {
  text: string;
  children?: ReactNode;
};

const ErrorMessage = ({ text, children }: ErrorMessageProps) => {
  return (
    <div className={sharedStyles.botMessageWrapper}>
      <div>{text}</div>
      <ErrorIcon width="60" height="60" />
      {children}
    </div>
  );
};

export default ErrorMessage;
