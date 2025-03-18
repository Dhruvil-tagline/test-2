import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/AuthProvider';
import ButtonCom from '../CommonComponent/ButtonCom';
import '../Css/Navbar.css'

const TeacherPage = ({navObj}) => {
    const navigate = useNavigate();
    const { removeToken } = useAuth();
    const handleLogout = () => {
        removeToken();
        navigate('/login')
        toast.success('Logout Successfully')
    }

    return (
        <div>
            <nav style={{ display: 'flex', background: 'black', justifyContent: "space-between", alignItems: "center", padding: "0px 5%", }}>
                <div style={{ display: 'flex', gap: '40px' }}>
                    {
                        navObj && navObj.map((val, index) => (
                            <NavLink key={index} className={({ isActive }) => isActive ? "active" : ""} to={val.to}>{val.text}</NavLink>
                        ))
                    }
                </div>
                <div>
                    <ButtonCom onClick={handleLogout} text='Logout' />
                </div>
            </nav>
            <div style={{ padding: '20px 0px' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherPage
