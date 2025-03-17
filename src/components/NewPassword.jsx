import axios from 'axios';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';
import { validatePassword } from '../utils/validation';
import { postRequest } from '../utils/api';
import { useAuth } from '../Context/AuthProvider';

const NewPassword = () => {
    const { setToken } = useAuth();
    const [password, setPassword] = useState('');
    let token;
    const [searchParams] = useSearchParams();
    const [confirmPassword, setConfirm] = useState('');
    token = searchParams.get('token');
    const fetchData = async () => {
        let response = await postRequest(`users/ForgotPassword/Verify?token=${token}`, { Password: password, ConfirmPassword: confirmPassword })
        if (response) {
            console.log(response)
        }
        if (response.statusCode === 200) {
            toast.success('password reset successfully.');
            // document.cookie = `token = ${token}`;
            setToken(token);
        }
        else {
            toast.error(response?.message)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let passwordValidation = validatePassword(password, confirmPassword);
        (passwordValidation) ? toast.error(passwordValidation) : fetchData()
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px' }}>

            <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
                <h1>Reset Account password</h1>
                <br />
                <InputCom placeholder='New password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <InputCom placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} />
                <ButtonCom text='Submit' type='submit' />
            </form>
        </div>
    )
}
export default NewPassword
