import { Link, Outlet } from 'react-router-dom';

const StudentProfile = () => {
    return (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', padding:"0px 20px" }}>
            <nav>
                <Link to='/student/profile/editName'>Edit Name</Link>
                <Link to='/student/profile/resetPassword'>Change Password</Link>
            </nav>

            <Outlet/>
        </div>
    )
}

export default StudentProfile
