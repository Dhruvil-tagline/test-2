import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Table from '../../CommonComponent/Table';
import { getRequest } from '../../utils/api';
import { useAuth } from '../../Context/AuthProvider';
import ButtonCom from '../../CommonComponent/ButtonCom';
const tableHeader = ['Index', 'Subject', 'Email', 'Notes', 'Action'];

const StudentDashboard = () => {
  const { token } = useAuth();
  const [exam, setExam] = useState([]);
  const [dataNotFound, setDataNotFound] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let response = await getRequest('student/studentExam', token);
      if (response.statusCode === 200) {
        setDataNotFound(true);
        setExam(response.data);
      }
      else {
        console.log(response?.error?.message);
        setDataNotFound(true);
      }
    }
    fetchData()
  }, []);
  const tableData = exam.map((val, index) => ({
    Index: index + 1,
    Subject: val.subjectName,
    Email: val.email,
    Notes: val.notes.join(', '),
    Action: !!val?.Result?.length ? (<ButtonCom text='View result' onClick={() => navigate('/student/result', { state: val })} />)
      : (<ButtonCom text='Start Exam' onClick={() => navigate('/student/examForm', { state: { id: val._id, subjectName: val.subjectName, notes: val.notes } })} />)
  }));
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: "1100px", padding: "10px", width: "100%"}}>
          <Table tableData={tableData} tableHeader={tableHeader} dataNotFound={dataNotFound} />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
