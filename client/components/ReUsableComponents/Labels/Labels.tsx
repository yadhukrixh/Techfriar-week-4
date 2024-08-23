import React, { FC } from 'react'
import styles from './Labels.module.css'

interface labelProps {
    value : string;
    className? : string;
}

const Labels:FC<labelProps> = ({value , className}) => {
  return (
    <div className={styles.labelsMainClass}>
        <label className={className ? className : '' }>{value}</label>
    </div>
  )
}

export default Labels
