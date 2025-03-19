import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthProvider';
import './AuthCss/SignUp.css'
import { postRequest } from '../../utils/api';
import { validatePassword } from '../../utils/validation';
import InputCom from '../../CommonComponent/InputCom';
import ButtonCom from '../../CommonComponent/ButtonCom';
import { useLoader } from '../../Context/LoaderProvider';

const NewPassword = () => {
    const { setToken } = useAuth();
    const { setLoading } = useLoader();
    const [password, setPassword] = useState('');
    let token;
    const [searchParams] = useSearchParams();
    const [confirmPassword, setConfirm] = useState('');
    token = searchParams.get('token');
    const fetchData = async () => {
        try {
            setLoading(true);
            let response = await postRequest(`users/ForgotPassword/Verify?token=${token}`, { Password: password, ConfirmPassword: confirmPassword })
            if (response.statusCode === 200) {
                toast.success('password reset successfully.');
                setToken(token);
            }
            else {
                toast.error(response?.message)
            }
        } catch (error) {
            toast.error('Server error');
        }
        finally {
            setLoading(false);
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let passwordValidation = validatePassword(password, confirmPassword);
        (passwordValidation) ? toast.error(passwordValidation) : fetchData()
    }
    return (
        <div className='authContainer'>

            <div className='authInnerDiv'>
                <form onSubmit={handleSubmit} className='form' style={{display:"flex",flexDirection:"column",gap:"20px" }}>
                    <h1 className='authHeading'>Reset Account password</h1>
                    <InputCom type='password' placeholder='New password...' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <InputCom type='password' placeholder='Confirm password...' value={confirmPassword} onChange={(e) => setConfirm(e.target.value)} />
                    <div>
                    <ButtonCom text='Submit' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewPassword
