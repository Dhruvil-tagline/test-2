import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider';
import { getRequest } from '../../utils/api';
import ButtonCom from '../../CommonComponent/ButtonCom';

const StudentDetails = () => {
    const { id } = useParams();
    const {token} = useAuth();
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);


    useEffect(() => {
        const fetchStudentDetails = async () => {
            const response = await getRequest(`dashboard/Teachers/viewStudentDetail?id=${id}`, token);
            if (response.statusCode === 200) {
                setStudentData(response.data);
                console.log(response.data);
            } else {
                console.log(response);
                console.log(response?.message);
            }
        };
        fetchStudentDetails();
    }, [id]);

    if (!studentData) return <p>Loading details...  </p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', backgroundColor: '#121212' }}>
            <h1 style={{ textAlign: 'center'}}>Student ID: {id}</h1>

            <div>
                {!!studentData.length && studentData.map((val, index) => (
                    <div key={index} style={{ border: '1px solid gray', padding: '15px', marginBottom: '15px', borderRadius: '8px', backgroundColor: 'balck' }}>
                        <h2 style={{ margin: '5px 0', color: 'green' }}>Name: {val.name}</h2>
                        <p style={{ margin: '5px 0'}}>Email: {val.email}</p>

                        {!!val?.Result?.length && val.Result.map((res, resIndex) => (
                            <div key={resIndex} style={{ padding: '10px', marginTop: '10px', borderRadius: '5px', backgroundColor: '#222', border: '1px solid #333' }}>
                                <p style={{ margin: '3px 0'}}><strong>Subject Name:</strong> {res.subjectName}</p>
                                <p style={{ margin: '3px 0'}}><strong>Result Status:</strong> {res.resultStatus}</p>
                                <p style={{ margin: '3px 0'}}><strong>Score:</strong> {res.score}</p>
                                <p style={{ margin: '3px 0'}}><strong>Rank:</strong> {res.rank}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ButtonCom text='Back' onClick={() => navigate(-1)} style={{ backgroundColor: '#f1c40f', color: '#121212', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} />
            </div>
        </div>


    )
}

export default StudentDetails
