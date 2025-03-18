import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../Context/AuthProvider';
import { getRequest } from '../../../utils/api';
import ButtonCom from '../../../CommonComponent/ButtonCom';
import Table from '../../../CommonComponent/Table';

const StudentDetails = () => {
    const { id } = useParams();
    const { token } = useAuth();
    const[dataNotFound, setDataNoFound] = useState(false)
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);
    const tableHeader = ['Index', 'Subject', 'Score', 'Rank'];
    let index = 1;
    const tableData = studentData?.Result && studentData?.Result.map((val) => ({
        Index: index++,
        Subject: val.subjectName,
        Score: val.score,
        Rank: val.rank
    }))

    useEffect(() => {
        const fetchStudentDetails = async () => {
            const response = await getRequest(`dashboard/Teachers/viewStudentDetail?id=${id}`, token);
            if (response.statusCode === 200) {
                setStudentData(response.data[0]);
                console.log(response.data);
                setDataNoFound(true)
            } else {
                console.log(response);
                console.log(response?.message);
                setDataNoFound(true)
            }
        };
        fetchStudentDetails();
    }, [id]);

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between', padding:"10px 30px", color:"green", fontSize:"20px"}}>
            <p>Name: {studentData?.name}</p>
            <p>Email: { studentData?.email}</p>
            </div>
            <Table tableHeader={tableHeader} tableData={tableData} dataNotFound={ dataNotFound} />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ButtonCom text='Back' onClick={() => navigate(-1)} style={{ backgroundColor: '#f1c40f', color: '#121212', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }} />
            </div>
        </div>


    )
}

export default StudentDetails
