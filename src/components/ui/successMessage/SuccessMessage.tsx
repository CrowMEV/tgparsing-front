import { ReactNode } from 'react';
import { ReactComponent as CheckMarkIcon } from '../../../assets/images/icons/check-mark-icon.svg';

import styles from './success-message.module.sass';

type SuccessMessageProps = {
  text: string;
  children?: ReactNode;
};

const SuccessMessage = ({ text, children }: SuccessMessageProps) => {
  return (
    <div className={styles.successMessage}>
      <div>{text}</div>
      <CheckMarkIcon width="60" height="60" />
      {children}
    </div>
  );
};

export default SuccessMessage;
