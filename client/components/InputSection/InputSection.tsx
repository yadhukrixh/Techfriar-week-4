import React, { FC, ChangeEvent } from 'react';

interface InputSectionProps {
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const InputSection: FC<InputSectionProps> = ({ type, value, onChange, placeholder, className }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={className ? className : 'custom-input'}
    />
  );
};

export default InputSection;
