import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../Context/AuthProvider';
import ButtonCom from '../../CommonComponent/ButtonCom';


const StudentPage = ({navObj}) => {
  const navigate = useNavigate();
  const { removeToken } = useAuth();
  const handleLogout = () => {
    removeToken();
    navigate('/login')
    toast.success('Logout Successfully')
  }
  const teacherNavObj = [{ to: 'dashboard', text: 'Dashboard' }, { to: 'profile', text: 'Profile' }]

  return (
    <div>
      <nav style={{ display: 'flex', background: 'black', justifyContent: "space-between", alignItems: "center", padding: "0px 5%", }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          {
            navObj && navObj.map((val, index) => (
              <NavLink key={index} className={({ isActive }) => isActive ? "active" : ""} to={val.to}>{val.text}</NavLink>
            ))
          }
          {/* <NavLink to='/student/dashboard'>Dashboard</NavLink>
          <NavLink to='/student/profile'>Profile</NavLink> */}
        </div>
        <div>
          <ButtonCom onClick={handleLogout} text='Logout' />
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default StudentPage
