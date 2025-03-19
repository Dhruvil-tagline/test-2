import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider';
import { getRequest } from '../../utils/api';

const Protected = ({ children }) => {
    const { token, removeToken } = useAuth();

    const getToken = async () => {
        let response = await getRequest('users/newPassword', token)
        if (response?.statusCode !== 200) {
            removeToken();
        }           
    }
    useEffect(() => {
        token && getToken();
    }, []);
    return ((!!token ? children : <Navigate to='/login' />))
}

export default Protected
