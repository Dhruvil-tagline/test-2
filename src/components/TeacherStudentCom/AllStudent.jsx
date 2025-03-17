import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthProvider';
import { getRequest } from '../../utils/api';
import ButtonCom from '../../CommonComponent/ButtonCom';
import { useNavigate } from 'react-router-dom';

const AllStudent = ({ apiEndpoint }) => {
    const { token } = useAuth();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(apiEndpoint, token);
            if (response.statusCode === 200) {
                console.log(response.data);
                setStudents(response.data);
            }
            else {
                console.log(response?.message)
            }
        }
        fetchData();
    }, [apiEndpoint])
    return (
        <div>
            <h1>{apiEndpoint.includes('StudentForExam') ? 'Verified Students' : 'All Students'}</h1>
            <table>
                <thead>
                    <tr>
                        <td>Index</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {students && students.map((student, index) => (
                        <tr key={student._id}>
                            <td>{index + 1 }</td>
                            <td>{student.email}</td>
                            <td>{student.name}</td>
                            <td>{student.status}</td>
                            <td>
                                <ButtonCom text='student Details' id={student._id} onClick={() => navigate(`/teacher/student/${student._id}`)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AllStudent
