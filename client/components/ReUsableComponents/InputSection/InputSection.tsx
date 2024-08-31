import React, { FC, ChangeEvent } from 'react';
import styles from './InputSection.module.css';

interface InputSectionProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  editableStatus?:boolean;
  toUppercase?:boolean;
}

const InputSection: FC<InputSectionProps> = ({ type, value, onChange, placeholder, className ,editableStatus,toUppercase}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(toUppercase){
      const upperCaseValue = e.target.value.toUpperCase(); // Convert to uppercase
      onChange(upperCaseValue);
    }else{
      onChange(e.target.value);
    }
  };

  return (
    <div className={styles.inputSectionMainClass}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={className ? className : 'custom-input'}
        required
        readOnly={editableStatus?editableStatus:false}
      />
    </div>
  );
};

export default InputSection;
