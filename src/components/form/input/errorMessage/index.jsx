import React from "react";

import styles from './ErrorMessage.module.scss'

const ErrorMessage = ({ text, offset }) => {
    return (
        <>
            <div className={!offset ? styles.error : styles.margin}>{text}</div>
        </>
    )
}

export default ErrorMessage;