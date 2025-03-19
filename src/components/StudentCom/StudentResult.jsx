import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/AuthProvider';
import { getRequest } from '../../utils/api';
import Table from '../../CommonComponent/Table';
const tableHeader = ['Index', 'Subject', "Score", 'Rank'];

const StudentResult = () => {
  const { state } = useLocation();
  const { token } = useAuth();
  const [studentData, setStudentData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest('student/getStudentDetail', token);
      if (response.statusCode === 200) {
        setStudentData(response.data);
      }
      else {
        console.log(response?.message?.error);
      }
    }
    fetchData();
  }, []);
  const tableData = state?.Result.map((res, index) => ({
    Index: index + 1,
    Subject: res.subjectName,
    Score: res.score,
    Rank: res.rank
  }))
  return (
    <div style={{ display: "flex", justifyContent: 'center', height: "80vh", alignItems: "center", flexDirection: "column" }}>
      <h3 style={{ textAlign: "center", color: "green", paddingBottom: "10px" }}>RESULT</h3>
      <h1 style={{ color: " rgb(18, 219, 206)" }}> Hello" {studentData?.name || 'Unknown'}</h1>
      <p style={{ padding: "10px 0px" }}> {studentData?.email || 'Data not found'}</p>
      <div style={{ maxWidth: "900px", padding: "10px", width: "100%" }}>
        <Table tableData={tableData} tableHeader={tableHeader} />
      </div>
    </div>

  )
}

export default StudentResult
