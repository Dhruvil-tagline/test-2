import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import ButtonCom from '../CommonComponent/ButtonCom'
import { toast } from 'react-toastify'

const TeacherPage = () => {
  const navigate = useNavigate()
   const handleLogout = () => {
      document.cookie = ('token =')
      navigate('/login')
      toast.success('Logout Successfully')
    }
  return (
    <div>
      <nav style={{ display: 'flex', background: 'black', justifyContent: "space-between", alignItems:"center", padding:"10px 5%",}}>
        <div style={{display:'flex', gap:'40px'}}>
        <NavLink to='/teacher'>Dashboard</NavLink>
        <NavLink to='/teacher/student'>Student</NavLink>
        <NavLink to='/teacher/profile'>Profile</NavLink>
        </div>
      <div>
        <ButtonCom onClick={handleLogout} text='Logout' />
      </div>
      </nav>
      <Outlet/>
    </div>
  )
}

export default TeacherPage
