import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthProvider';
import { getRequest } from '../../../utils/api';
import ButtonCom from '../../../CommonComponent/ButtonCom';
import Table from '../../../CommonComponent/Table';

const AllStudent = ({ apiEndpoint }) => {
    const { token } = useAuth();
    const [students, setStudents] = useState([]);
    const[dataNotFound, setDataNoFound] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest(apiEndpoint, token);
            if (response.statusCode === 200) {
                console.log(response.data);
                setStudents(response.data);
                setDataNoFound(true);
            }
            else {
                console.log(response?.message);
                setDataNoFound(true);
            }
        }
        fetchData();
    }, [apiEndpoint]);
    const tableHeader = ['Index', 'Name', 'Email', 'Status', 'Action'];
    const tableData = students.map((val, index) => ({
        Index: index,
        Name: val.name,
        Email: val.email,
        Status: val.status,
        Action: <ButtonCom text='student Details' id={val._id} onClick={() => navigate(`/teacher/student/${val._id}`)} />
    }))
    return (
        <div>
            <h1 style={{ textAlign: 'center', color: "skyblue" }}>{apiEndpoint.includes('StudentForExam') ? 'Verified Students' : 'All Students'}</h1>
             <Table tableHeader={tableHeader} tableData={tableData} dataNotFound={dataNotFound}/> 
      
        </div>
    )
}

export default AllStudent
