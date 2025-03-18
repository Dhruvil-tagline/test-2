import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ButtonCom from '../../CommonComponent/ButtonCom'
import './TeacherComCss/TeacherPage.css'
import { useAuth } from '../../Context/AuthProvider'

const TeacherPage = () => {
  const navigate = useNavigate();
    const { removeToken } = useAuth();
   const handleLogout = () => {
     removeToken();
      navigate('/login')
      toast.success('Logout Successfully')
   }
  
  const teacherNavObj = [{ to: 'dashboard', text: 'Dashboard' }, { to: 'student', text: 'Student' }, { to: 'profile', text: 'Profile'}]
  return (
    <div>
      <nav style={{ display: 'flex', background: 'black', justifyContent: "space-between", alignItems:"center", padding:"0px 5%",}}>
        <div style={{ display: 'flex', gap: '40px' }}>
          {
            teacherNavObj.map((val,index) => (
              <NavLink key={index} className={({ isActive }) => isActive ? "active" : ""} to={val.to}>{val.text}</NavLink>
            ))
          }
          {/* <NavLink className={({ isActive }) => isActive ? "active" : ""} to='/teacher/dashboard'>Dashboard</NavLink> */}
          {/* <NavLink className={({ isActive,}) =>  isActive ? "active" : ""} to='/teacher/student'>Student</NavLink> */}
          {/* <NavLink className={({ isActive,}) =>  isActive ? "active" : ""} to='/teacher/profile'>Profile</NavLink> */}
        </div>
      <div>
        <ButtonCom onClick={handleLogout} text='Logout' />
      </div>
      </nav>
      <div style={{padding:'20px 0px'}}>
      <Outlet/>
      </div>
    </div>
  )
}

export default TeacherPage
