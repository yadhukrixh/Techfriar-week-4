import React, {FC} from 'react';
import styles from './CustomizableButton.module.css';

interface ButtonProps {
    value: string;
    className?:string;
    disabled?:boolean;
    onClickFunction ?: () => void;
};

const CustomizableButton: FC<ButtonProps> = ({value, className , onClickFunction,disabled}) => {

  return (
    <div className={styles.buttonMainClass}>
      <button className={className ? className : ''} onClick={onClickFunction} disabled={disabled}>
      {value} 
      </button>
    </div>
  )
}

export default CustomizableButton;
