import React, { useState } from 'react'
import TeacherForm from './TeacherForm'
import ExamList from './ExamList'
import ButtonCom from '../CommonComponent/ButtonCom';

const TeacherDashboard = () => {
   const [displayForm, setDisplayForm] = useState(false);
  const [refreshExamList, setRefreshExamList] = useState(false);

  return (
    <div style={{padding: '0px 20px'}}>
      <div style={{ marginBottom: "10px" }}>
        <ButtonCom text='Create Exam' onClick={() => setDisplayForm(!displayForm)} />
      </div>
      {displayForm && <TeacherForm onExamCreated={() => setRefreshExamList(prev => !prev)} />}
      <ExamList key={refreshExamList}/>
    </div>
  )
}

export default TeacherDashboard
