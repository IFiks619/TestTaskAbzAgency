import React from "react";

import ErrorMessage from "./errorMessage";
import styles from './Input.module.scss'


const Input = (props) => {
    const name = props.name
    const email = props.email
    const phone = props.phone


    const isNameEmpty = name.isDirty && name.isEmpty.bool
    const isNameShort = name.isDirty && !name.isEmpty.bool && name.minLengthError.bool
    const isNameLong = name.isDirty && !name.isEmpty.bool && name.maxLengthError.bool

    const isEmailEmpty = email.isDirty && email.isEmpty.bool
    const isEmailValid = email.isDirty && !email.isEmpty.bool && email.emailError.bool

    const isPhoneEmpty = phone.isDirty && phone.isEmpty.bool
    const isPhoneValid = phone.isDirty && !phone.isEmpty.bool && phone.phoneError.bool

    return (
        <div className={styles.root}>
            <div className='form__item'>
                <input
                    value={name.value}
                    onChange={e => name.onChange(e)}
                    onBlur={e => name.onBlur(e)}
                    type="text"
                    className={name.isDirty && !name.anyNameErrors ? 'form__input form__input__error' : 'form__input '}
                    placeholder=" " />
                {isNameEmpty && <ErrorMessage text={name.isEmpty.errorText} />}
                {isNameShort && <ErrorMessage text={name.minLengthError.errorText} />}
                {isNameLong && <ErrorMessage text={name.maxLengthError.errorText} />}
                <label htmlFor="name" className={name.isDirty && !name.anyNameErrors ? 'form__label form__error' : 'form__label '}>Your name</label>
            </div>
            <div className='form__item'>
                <input
                    type="text"
                    value={email.value}
                    onChange={e => email.onChange(e)}
                    onBlur={e => email.onBlur(e)}
                    className={email.isDirty && email.emailError.bool ? 'form__input form__input__error' : 'form__input '}
                    placeholder=" " />
                {isEmailEmpty && <ErrorMessage text={email.isEmpty.errorText} />}
                {isEmailValid && <ErrorMessage text={email.emailError.errorText} />}
                <label htmlFor="email" className={email.isDirty && email.emailError.bool ? 'form__label form__error' : 'form__label '}>Email</label>
            </div>
            <div className='form__item'>
                <input
                    type="text"
                    value={phone.value}
                    onChange={e => phone.onChange(e)}
                    onBlur={e => phone.onBlur(e)}
                    className={phone.isDirty && phone.phoneError.bool ? 'form__input form__input__error' : 'form__input '}
                    placeholder=" " />
                {isPhoneEmpty && <ErrorMessage offset={true} text={phone.isEmpty.errorText} />}
                {isPhoneValid && <ErrorMessage offset={true} text={phone.phoneError.errorText} />}
                <label htmlFor="phone" className={phone.isDirty && phone.phoneError.bool ? 'form__label form__error' : 'form__label '}>Phone</label>
                <span className={phone.isDirty && phone.phoneError.bool ? styles.error : styles.span}>+38 (XXX) XXX - XX - XX</span>
            </div>
        </div>
    )
}

export default Input