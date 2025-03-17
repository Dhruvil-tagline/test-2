import React, { useEffect, useState } from 'react'
import { getRequest, putRequest } from '../../utils/api'
import { useAuth } from '../../Context/AuthProvider'
import InputCom from '../../CommonComponent/InputCom';
import ButtonCom from '../../CommonComponent/ButtonCom';
import { validateName } from '../../utils/validation';
import TeacherProfile from '../TeacherProfile';
import { toast } from 'react-toastify';

const StudentProfile = () => {
    const { token } = useAuth();
    const [student, setStudent] = useState();
    const [error, setError] = useState('');
    const [text, setText] = useState('');
    const handleSubmit = async () => {
        setError('')
        let err = validateName(text);
        if (err) {
            setError(err);
            return;
        }
        const response = await putRequest('student/studentProfile', { name: text }, { 'access-token': token });
        if (response) {
            console.log(response);
        }
        if (response.statusCode === 200) {
            console.log(response.data);
            toast.success('Name updated Successfully');
        }
        else {
            console.log(response?.message?.error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest('student/getStudentDetail', token);
            if (response) {
                console.log(response)
            }
            if (response.statusCode === 200) {
                console.log(response.data);
                setStudent(response.data);
            }
            else {
                console.log(response?.message?.error);
            }
        }
        fetchData();
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
            <div style={{ maxWidth: '600px', width: '100%', margin: "30px 0px", padding: "10px", border: '1px solid gray', borderRadius: "10px" }}>
                <h1>Edit Profile</h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px 0px" }}>
                    <p>Name: {student?.name}</p>
                    <p>Email: {student?.email}</p>
                    <p>Role: {student?.role}</p>
                </div>
                <hr style={{border: '1px solid blue'}} />
                <div style={{ marginTop: "10px" }}>
                    <p>Change Name</p>
                    <span style={{ color: "red" }}>{error}</span>
                    <InputCom type='text' name='name' id='name' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter your name...' />
                    <ButtonCom text='Update name' onClick={handleSubmit} />
                </div>
            </div>
            <TeacherProfile user='Student'/>
        </div>
    )
}

export default StudentProfile
