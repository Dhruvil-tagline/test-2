import ButtonCom from '../../CommonComponent/ButtonCom';
import ExamList from './ExamList';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '0px 20px', }}>
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: 'center' }}>
        <ButtonCom text='Create New  Exam' color='blue' onClick={() => navigate('/teacher/teacherForm')} />
      </div>
      <ExamList />
    </div>
  )
}

export default TeacherDashboard
