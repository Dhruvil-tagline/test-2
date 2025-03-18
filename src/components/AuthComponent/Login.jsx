import { useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import './AuthCss/SignUp.css'
import login from '../../assets/login.jpg'
import { toast } from 'react-toastify';
import { errorObj, userObj } from '../../StaticData/staticObj';
import { useAuth } from '../../Context/AuthProvider';
import { validateEmail, validatePassword } from '../../utils/validation';
import InputCom from '../../CommonComponent/InputCom';
import ButtonCom from '../../CommonComponent/ButtonCom';
import Loader from '../../CommonComponent/Loader';
import { postRequest } from '../../utils/api';
import { useLoader } from '../../Context/LoaderProvider';

const Login = () => {
  const [user, setUser] = useState(userObj);
  const { setToken } = useAuth();
  const { setLoading} = useLoader();

  const [error, setError] = useState(errorObj)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const validate = () => {
    const errors = {};
    errors.emailError = validateEmail(user.email);
    errors.passwordError = validatePassword(user.password);
    setError(errors);
    return Object.values(errors).every((val) => !val);
  }

  const isAuthenticated = async () => {
    console.log('function called');
    try {
      setLoading(true);
      let response = await postRequest('users/Login', user, setLoading)
      if (response.statusCode === 200) {
        setToken(response?.data?.token)
        setUser({ ...userObj });
        toast.success("Login successfully")
        navigate(`/${response?.data?.role}/dashboard`)
      }
      else {
        toast.error('Invalid Credential')
      }
    } catch (error) {
       console.log(error)
    }
    finally {
      setLoading(false)
    }
  
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(errorObj);
    (validate()) && isAuthenticated();
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%', alignItems: "center", padding: '20px', }}>
      <Loader />
      <div style={{ border: "1px solid gray", padding: '30px', maxWidth: '600px', width: '100%', borderRadius:"10px"}}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', width: '100%', }}>
        <h1 style={{ textAlign: 'center', marginBottom: "20px" }}>Login </h1>
        <label htmlFor='email'>Email:</label> <span className='error'>{error.emailError}</span> <br />
        <InputCom type='email' value={user.email}  onChange={(e) => handleChange(e)} id='email' name='email'/>
        <br/>
        <label htmlFor='password'>Password:</label> <span className='error'>{error.passwordError}</span> <br />
        <InputCom type='password' value={user.password} onChange={(e) => handleChange(e)} id='password' name='password' /> <br />
        <div style={{ textAlign: 'center', marginBottom: "20px" }}>
        <ButtonCom text='Submit' type='submit'/>
        </div>
          <p ><Link to='/forgetPassword' style={{ textDecoration: 'underline' }}>Forget password</Link></p>
        <br/>
          <p style={{ marginLeft: "20px" }}>If you are not SingUp yet? <Link to='/signup' style={{ textDecoration: 'underline' }}> SignUp</Link></p>
      </form>
      </div>
    </div>
  )
}

export default Login

