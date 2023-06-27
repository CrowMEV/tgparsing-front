import React, { CSSProperties, FC, useRef } from 'react';
import styles from './textInput.module.sass';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  temporaryDisabled?: boolean;

  style?: CSSProperties;
  placeholderStyle?: CSSProperties;
  errorMessage?: string;
  hintMessage?: string;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

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
  name,
  autoFocus = false,
  disabled = false,
  temporaryDisabled = false,
  required = false,
  minLength,
  maxLength,
  onChange,
  onBlur,
  onFocus,

  className,
  style,
  placeholderStyle,
  errorMessage = '',
  hintMessage = '',
  startIcon,
  endIcon,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLInputElement>(null);

  return (
    <div style={style} className={`${styles.inputContainer} ${className}`}>
      <div
        ref={inputWrapperRef}
        className={`${styles.inputWrapper} ${
          errorMessage.length ? styles.error : ''
        } ${temporaryDisabled ? styles.temporaryDisabled : ''} ${
          disabled ? styles.disabled : ''
        }`}
        onClick={() => inputRef && inputRef.current?.focus()}
      >
        <input
          className={`${styles.input}`}
          ref={inputRef}
          type={type}
          name={name}
          defaultValue={defaultValue}
          value={value}
          disabled={temporaryDisabled || disabled}
          autoFocus={autoFocus}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e) => onChange?.(e)}
          onBlur={(e) => {
            inputWrapperRef.current?.classList.remove(styles.focus);
            onBlur?.(e);
          }}
          onFocus={(e) => {
            inputWrapperRef.current?.classList.add(styles.focus);
            onFocus?.(e);
          }}
          placeholder=" "
        />
        <Icon
          isError={Boolean(errorMessage.length)}
          startIcon={startIcon}
          endIcon={endIcon}
        />
        {placeholder && (
          <div className={styles.placeholder} style={placeholderStyle}>
            {placeholder}
          </div>
        )}
      </div>
      <SupportText errorMessage={errorMessage} hintMessage={hintMessage} />
    </div>
  );
};

export default TextInput;
