import React, { useEffect, useState } from "react";
import axios from "axios";

import Input from "./input";
import Radio from "./radio";
import Upload from "./upload";
import { useInput } from "../../hooks";
import successImg from '../../assets/img/success.svg';

const positionsNames = [{ name: 'Security', id: 1 }, { name: 'Designer', id: 2 }, { name: 'Content manager', id: 3 }, { name: 'Lawyer', id: 4 }]

const Form = ({ setNewUserRegistrated }) => {
    const name = useInput('', { isEmpty: true, minLength: 2, maxLength: 60 })
    const email = useInput('', { isEmpty: true, isEmail: true })
    const phone = useInput('', { isEmpty: true, isPhoneNumber: true })
    const [positionValue, setPositionValue] = useState('Lawyer')
    const [photo, setPhoto] = useState(null)
    const [postPositionId, setPostPositionId] = useState(1)
    const [token, setToken] = useState('')
    const [success, setSuccess] = useState(false)

    const isEverythinkValid = name.anyNameErrors && email.isDirty && !email.emailError.bool &&
        phone.isDirty && !phone.phoneError.bool && postPositionId && (photo === null ? false : true)

    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(res => setToken(res.data.token))
    }, [])

    useEffect(() => {
        positionsNames.map((positionName) => positionName.name === positionValue ? setPostPositionId(positionName.id) : '')
    }, [positionValue])

    function submitToServer(e) {
        e.preventDefault()
        if (isEverythinkValid) {
            setNewUserRegistrated(true)
            let formData = new FormData();
            let fileField = document.querySelector('input[type="file"]');
            formData.append('position_id', postPositionId);
            formData.append('name', String(name.value));
            formData.append('email', String(email.value));
            formData.append('phone', String(phone.value));
            formData.append('photo', fileField.files[0]);
            fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
                { method: 'POST', body: formData, headers: { 'Token': token, }, })
                .then(res => res.json())
                .then(data => {
                    if (!data.success) {
                        alert(data.message)
                    } else {
                        setSuccess(true)
                    }
                })
                .catch(e => console.error(e))
        }
    }


    return (
        <form className="container">
            <div className={success ? 'display_none' : 'container'}>
                <h2 className="title">Working with POST request</h2>
                <Input name={name} email={email} phone={phone} />
                <Radio setPositionValue={setPositionValue} />
                <Upload setPhoto={setPhoto} />
                <button onClick={submitToServer} className={!isEverythinkValid ? 'disabled mb-100' : 'm_btn mb-100 '}>Sign up</button>
            </div>
            <div className={!success ? 'display_none' : 'container'}>
                <h2 className="title">User successfully registered</h2>
                <img src={successImg} className='successImg' alt="" />
            </div>
        </form>
    )
}

export default Form;
