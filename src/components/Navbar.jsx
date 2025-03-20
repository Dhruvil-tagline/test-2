import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { useAuth } from '../Context/AuthProvider';
import ButtonCom from '../CommonComponent/ButtonCom';
import menu from '../assets/menu.png'
import exam from '../assets/exam.png'
import '../Css/Navbar.css'
import { useState } from 'react';

const TeacherPage = ({ navObj }) => {
    const navigate = useNavigate();
    const [openNav, setOpenNav] = useState(false);
    const { removeToken } = useAuth();
    const handleLogout = () => {
        removeToken();
        navigate('/login')
        toast.success('Logout Successfully')
    };
    const navClass = classNames('mobile', { mobileView: openNav });
    return (
        <div>
            <div className='navbar'>
                <div className='logoDiv'>
                    <div className='logoAndMenu'>
                        <div className='logo'>
                            <img src={exam} alt='ExamCite' height='40px' width='40px' />
                        </div>
                        <div className='menuDiv'>
                            <img src={menu} alt='Menu' className='menuBtn' onClick={() => setOpenNav(!openNav)} />
                        </div>
                    </div>
                    <nav className={navClass}>
                        <div className='innerNav'>
                            {
                                navObj && navObj.map((val, index) => (
                                    <NavLink key={index} className={({ isActive }) => isActive ? "active" : "navAnchor"} to={val.to}>{val.text}</NavLink>
                                ))
                            }
                        </div>
                    </nav>
                </div>
                <div className={navClass}>
                    <ButtonCom onClick={handleLogout} text='Logout' />
                </div>
            </div>
            <div style={{ padding: '20px 0px' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default TeacherPage
