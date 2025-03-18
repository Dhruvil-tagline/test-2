import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';
import InputCom from '../../CommonComponent/InputCom';
import ButtonCom from '../../CommonComponent/ButtonCom';
import { postRequest } from '../../utils/api';
import { useLoader } from '../../Context/LoaderProvider';
import Loader from '../../CommonComponent/Loader';


const ForgetPassword = () => {
    const [search, setSearch] = useState('');
    const { setLoading } = useLoader();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const searchUser = async () => {
        try {
            setLoading(true);
            let response = await postRequest('users/ForgotPassword', { email: search })
            if (response.statusCode === 200) {
                console.log(response);
                toast.success('check email and reset Password')
            }
            else {
                toast.error('User not find!')
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    const handleSubmit = (e) => {
        setError('')
        e.preventDefault()
        let emailValidate = validateEmail(search);
        (emailValidate) ? setError(emailValidate) : searchUser();
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px' }}>
            <Loader />
            <div style={{ border: "1px solid gray", padding: '30px', maxWidth: '600px', width: '100%', borderRadius: "10px" }}>
            <form onSubmit={handleSubmit} onReset={() => { setSearch(''); setError('') }} style={{ maxWidth: '500px', width: '100%' }}>
                    <h1>Find Your Account</h1> <br />
                    <p>Please enter your email address  to search for your account.</p>
                    <InputCom type='email' name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <span>{error}</span>
                    <div style={{display:'flex', gap:'20px'}}>
                    <ButtonCom style={{ display: 'inline-block', marginRight: '20px' }} text='Search' />
                     <ButtonCom onClick={() => navigate(-1)} text='Back'/>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default ForgetPassword
