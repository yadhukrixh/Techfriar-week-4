import React, {FC} from 'react'
import styles from './Buttons.module.css'
interface ButtonProps {
    value: string;
    className:string;
}
const Buttons: FC<ButtonProps> = ({value, className}) => {
  return (
    <>
      <button className={className ? className : styles.buttonClass}/>{value}<button/>
    </>
  )
}

export default Buttons
