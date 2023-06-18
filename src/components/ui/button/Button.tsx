import { CSSProperties } from 'react';
import styles from './Button.module.sass';

const VARIANTS = ['small', 'accent', 'additional'] as const;

type ButtonProps = {
  children: string;
  variant: (typeof VARIANTS)[number];
  disabled?: boolean;
  style?: CSSProperties;
};

const Button = ({
  children,
  variant,
  disabled = false,
  style = {},
}: ButtonProps) => {
  return (
    <button
      style={style}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]}`}
    >
      <span className={styles.innerText}>{children}</span>
    </button>
  );
};

export default Button;
