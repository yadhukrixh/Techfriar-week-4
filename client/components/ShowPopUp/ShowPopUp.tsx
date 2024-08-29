import React, { FC } from 'react';
import styles from './ShowPopUp.module.css';

interface ShowPopUpProps{
  valueType:string;
  value:string;
  setShowPopUp:(status:boolean)=>void;
}

const ShowPopUpComponent:FC<ShowPopUpProps> = ({valueType , value ,setShowPopUp}) => {

  const onContinue = () => {
    setShowPopUp(false);
  }


  return (
    <div>
      <div className={styles.popupOverlay}>
      <div className={styles.popupContainer}>
        <h2 className={styles.popHeading}>{valueType} verification </h2>
        <p className={styles.popDescription}>Your Email:<span>{value}</span> is verified. Continue to redirect to Phone Number validation.</p>
        <div className={styles.buttonGroup}>
          <button onClick={onContinue} className={styles.proceedButton}>
            Continue
          </button>
        </div>
      </div>
    </div>

    </div>
  )
}

export default ShowPopUpComponent;
