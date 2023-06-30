import React from 'react';
import styles from './iconButton.module.sass';

type IconButtonProps = {
  children: JSX.Element;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isError?: boolean;
};

const IconButton = ({ children, onClick, isError }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => onClick(e)}
      className={`${styles.buttonIcon} ${isError ? styles.error : ''}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
