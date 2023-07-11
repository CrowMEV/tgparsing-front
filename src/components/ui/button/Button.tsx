import { CSSProperties } from 'react';
import styles from './Button.module.sass';

const VARIANTS = ['small', 'accent', 'additional'] as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
  variant: (typeof VARIANTS)[number];
  style?: CSSProperties;
}

const Button = ({
  children,
  type = 'button',
  onClick,
  variant,
  disabled = false,
  style = {},
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      style={style}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      {...rest}
    >
      <span className={styles.innerText}>{children}</span>
    </button>
  );
};

export default Button;
