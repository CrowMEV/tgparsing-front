import React from 'react';
import styles from './iconButton.module.sass';

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isError?: boolean;
}

const IconButton = ({
  children,
  onClick,
  isError,
  className,
  ...rest
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={(e) => onClick(e)}
      className={`${styles.buttonIcon} ${
        isError ? styles.error : ''
      }, ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
