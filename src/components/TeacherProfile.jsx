import React, { useState } from 'react'
import InputCom from '../CommonComponent/InputCom'
import ButtonCom from '../CommonComponent/ButtonCom';
import { validateEmpty, validatePassword } from '../utils/validation';
import { postRequest } from '../utils/api';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthProvider';

const TeacherProfile = ({user}) => {
  const { token } = useAuth();
  const [passwordObj, setPasswordObj] = useState({ oldPassword: '', Password: '', ConfirmPassword: '' });
  const [error, setError] = useState({ oldPasswordError: '', newPasswordError: '' })
  const handleInput = (e) => { setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value }) };
  const validate = () => {
    const errors = {};
    errors.oldPasswordError = validateEmpty(passwordObj.oldPassword, 'Old Password')
    errors.newPasswordError = validatePassword(passwordObj.Password, passwordObj.ConfirmPassword);
    setError(errors);
    return Object.values(errors).every((val) => !val);
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      let response = await postRequest('users/ResetPassword', passwordObj, { 'access-token': token });
      (response.statusCode === 200) ? toast.success('password reset successfully.') : toast.error(response?.message)
    }
  }
  return (
    <div style={{display:"flex", justifyContent:'center',alignItems:'center'}}>
      <div style={{ maxWidth: '600px', width: '100%', margin: "30px 0px", padding: "20px", border: '1px solid gray', borderRadius: "10px" }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', width: '100%' }}>
          <h1 style={{ textAlign: 'center', color: "skyblue" }}>Reset  password</h1>
        <br />
        <label htmlFor='oldPassword'>Old Password:</label>
        <span style={{ color: "red" }}>{error.oldPasswordError}</span>
        <InputCom placeholder='Old password...' id='oldPassword' name='oldPassword' value={passwordObj.oldPassword} onChange={handleInput} />
        <label htmlFor='newPassword'>New Password:</label>
        <span style={{ color: "red" }}>{error.newPasswordError}</span>
        <InputCom placeholder='New password...' id='newPassword' name='Password' value={passwordObj.Password} onChange={handleInput} />
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <InputCom placeholder='Confirm password...' id='confirmPassword' name='ConfirmPassword' value={passwordObj.ConfirmPassword} onChange={handleInput} />
        <ButtonCom color='green' text='Submit' type='submit' />
        </form>
      </div>
    </div>
  )
}

export default TeacherProfile
