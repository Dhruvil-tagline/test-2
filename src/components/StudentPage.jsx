import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import ButtonCom from '../CommonComponent/ButtonCom'
import { toast } from 'react-toastify'
import { useAuth } from '../Context/AuthProvider'

const StudentPage = () => {
  const navigate = useNavigate();
  const { removeToken } = useAuth();
  const handleLogout = () => {
    removeToken();
    navigate('/login')
    toast.success('Logout Successfully')
  }
  return (
    <div>
      <nav style={{ display: 'flex', background: 'black', justifyContent: "space-between", alignItems: "center", padding: "10px 5%", }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          <NavLink to='/student'>Dashboard</NavLink>
          <NavLink to='/student/profile'>Profile</NavLink>
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
