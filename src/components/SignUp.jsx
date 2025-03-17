import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Css/SignUp.css'
import { toast } from 'react-toastify';
import InputCom from '../CommonComponent/InputCom';
import ButtonCom from '../CommonComponent/ButtonCom';
import DropDown from '../CommonComponent/DropDown';
import { sigUpErrorObj, signUpUserObj } from '../StaticData/staticObj'
import { dropDownValidate, validateEmail, validateName, validatePassword, } from '../utils/validation';
import { postRequest } from '../utils/api';

const SignUp = () => {
  const [user, setUser] = useState(signUpUserObj);
  const navigate = useNavigate();
  const [error, setError] = useState(sigUpErrorObj)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const validate = () => {
    const errors = {};
    errors.nameError = validateName(user.name);
    errors.emailError = validateEmail(user.email);
    errors.passwordError = validatePassword(user.password);
    errors.roleError = dropDownValidate(user.role, 'Role');
    setError(errors);
    return Object.values(errors).every((val) => !val);
  }
  const addUser = async () => {
    let response = await postRequest('users/SignUp', user)
      if (response) {
        console.log(response)
      }
      if (response.statusCode === 200) {
        toast.success('Signup successfully')
        console.log(response?.data?.role)
        setUser(signUpUserObj);
        navigate('/login');
      }
      else {
        toast.error(response?.message);
      }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(sigUpErrorObj);
    (validate()) && addUser()
  }
  const dropObj = [{ text: 'Select role', value: '' }, { text: 'Teacher', value: 'teacher' }, { text: 'Student', value: 'student' }]
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: "20px" }}>SignUp </h1>
        <label htmlFor='name'>Name:</label> <span className='error'>{error.nameError}</span> <br />
        <InputCom type='text' id='name' name='name' value={user.name} onChange={(e) => handleChange(e)} /> <br />
        <label htmlFor='email'>Email:</label> <span className='error'>{error.emailError}</span> <br />
        <InputCom type='email' value={user.email} onChange={(e) => handleChange(e)} id='email' name='email' /> <br />
        <label htmlFor='password'>Password:</label> <span className='error'>{error.passwordError}</span> <br />
        <InputCom type='password' value={user.password} onChange={(e) => handleChange(e)} id='password' name='password' /> <br />
        <label htmlFor='role'>Role:</label> <span className='error'>{error.roleError}</span> <br />
        <DropDown value={user.role} onChange={(e) => handleChange(e)} id='role' name='role' dropObj={dropObj} />
        <br />
        <div style={{ textAlign: 'center', marginBottom: "20px" }}>
          <ButtonCom type='submit' text='Submit' />
        </div>
        <p>If you are already SignUp than sing in <Link to='/login'> Login</Link></p>
      </form>
    </div>
  )
}

export default SignUp

