import  { useEffect, useState } from 'react'

const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState({ bool: true, errorText: '' })
    const [minLengthError, setMinLengthError] = useState({ bool: false, errorText: '' })
    const [maxLengthError, setMaxLengthError] = useState({ bool: false, errorText: '' })
    const [emailError, setEmailError] = useState({ bool: false, errorText: '' })
    const [phoneError, setPhoneError] = useState({ bool: false, errorText: '' })
    const [anyNameErrors, setAnyNameErrors] = useState(false)


    useEffect(() => {
        for (let validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError({ bool: true, errorText: 'String is too short' })
                        : setMinLengthError({ bool: false, errorText: '' })
                    break;
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError({ bool: true, errorText: 'String is too long' })
                        : setMaxLengthError({ bool: false, errorText: '' })
                    break;
                case 'isEmpty':
                    value ? setIsEmpty({ bool: false, errorText: '' })
                        : setIsEmpty({ bool: true, errorText: 'Value can`t be empty' })
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    re.test(String(value).toLowerCase()) ? setEmailError({ bool: false, errorText: '' })
                        : setEmailError({ bool: true, errorText: 'That is not email' })
                    break;
                case 'isPhoneNumber':
                    // /^\+38[ ][(]\d{3}[)][ ]\d{3}[- ]\d{2}[- ]\d{2}$/ format +38 (000) 000 00 00
                    const res = /^\+380\d{3}\d{2}\d{2}\d{2}$/
                    res.test(value) ? setPhoneError({ bool: false, errorText: '' })
                        : setPhoneError({ bool: true, errorText: 'wrong phone number' })
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty.bool || minLengthError.bool || maxLengthError.bool) {
            setAnyNameErrors(false)
        } else {
            setAnyNameErrors(true)
        }

    }, [isEmpty.bool, minLengthError.bool, maxLengthError.bool])

    return {
        isEmpty,
        minLengthError,
        maxLengthError,
        emailError,
        phoneError,
        anyNameErrors
    }
}

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}