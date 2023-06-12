import React, { useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.sass';

type DropdownProps = {
  options: string[];
  selectedOption: string;
  disabled?: boolean;
  onChange: (option: string) => any;
};

const Dropdown = ({
  options,
  selectedOption,
  disabled = false,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);
  return (
    <div
      className={`${styles.dropdownContainer} ${disabled && styles.disabled}`}
      ref={dropdownRef}
    >
      <div
        className={`${styles.dropdownHeader} ${isOpen && styles.open}`}
        onClick={() => {
          if (disabled) {
            return;
          }
          setIsOpen((state) => !state);
        }}
      >
        {selectedOption}
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((option) => (
            <li
              key={option}
              className={styles.dropdownItem}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
