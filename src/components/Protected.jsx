import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getRequest } from '../utils/api';
import { useAuth } from '../Context/AuthProvider';

const Protected = ({ children }) => {
    const { token } = useAuth();
    // const value = document.cookie;
    // const parts = value.split(`token=`);
    // let token = parts[parts.length - 1];
    const getToken = async () => {
        let response = await getRequest('users/newPassword', token)
            if (response.statusCode === 200) {
                console.log(response)
            }
            else {
                document.cookie =('token =')
            }
    }
    useEffect(() => {
        token && getToken();
    },[])
    return (
        (!!token ? children : <Navigate to='/login' />)
    )
}

export default Protected
