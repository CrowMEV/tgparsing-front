import React, { CSSProperties, FC } from 'react';
import styles from './textInput.module.sass';

type InputProps = {
  type: React.InputHTMLAttributes<unknown>['type'];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  autofocus?: boolean;
  disabled?: boolean;
  temporaryDisabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  onBlur?: React.HTMLAttributes<HTMLDivElement>['onBlur'];
  onFocus?: React.HTMLAttributes<HTMLDivElement>['onFocus'];

  style?: CSSProperties;
  errorMessage?: string;
  hintMessage?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
};

const Icon: FC<{
  isError: boolean;
  startIcon: JSX.Element | undefined;
  endIcon: JSX.Element | undefined;
}> = ({ isError, startIcon, endIcon }) => {
  if (endIcon)
    return (
      <span className={`${styles.endIcon} ${isError && styles.error}`}>
        {endIcon}
      </span>
    );
  if (startIcon)
    return (
      <span className={`${styles.startIcon} ${isError && styles.error}`}>
        {startIcon}
      </span>
    );
  return null;
};

const SupportText: FC<{ errorMessage: string; hintMessage: string }> = ({
  errorMessage,
  hintMessage,
}) => {
  if (errorMessage.length)
    return <span className={styles.errorMessage}>{errorMessage}</span>;
  if (hintMessage.length)
    return <span className={styles.hintMessage}>{hintMessage}</span>;
  return null;
};

const TextInput = ({
  type,
  value,
  defaultValue,
  placeholder,
  autofocus = false,
  disabled = false,
  temporaryDisabled = false,
  required = false,
  minLength,
  maxLength,
  onChange,
  onBlur,
  onFocus,

  style,
  errorMessage = '',
  hintMessage = '',
  startIcon,
  endIcon,
}: InputProps) => {
  return (
    <div style={style} className={styles.inputContainer}>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${errorMessage.length && styles.error} ${
            temporaryDisabled && styles.temporaryDisabled
          }`}
          type={type}
          defaultValue={defaultValue}
          value={value}
          disabled={temporaryDisabled || disabled}
          autoFocus={autofocus}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e) => onChange?.(e)}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <Icon
          isError={Boolean(errorMessage.length)}
          startIcon={startIcon}
          endIcon={endIcon}
        />
        {placeholder && <div className={styles.placeholder}>{placeholder}</div>}
      </div>
      <SupportText errorMessage={errorMessage} hintMessage={hintMessage} />
    </div>
  );
};

export default TextInput;
