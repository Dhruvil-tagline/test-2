import React, { useState } from 'react';
import ButtonCom from '../../CommonComponent/ButtonCom';
import AllStudent from './TeacherStudentCom/AllStudent';
import filter from '../../assets/filter.png'


const TeacherStu = () => {
  const [allStudent, setAllStudent] = useState(true);

  return (
    <div>
      <div style={{display:"flex",justifyContent:"center", alignItems:"center", gap:"10px",marginBottom:"20px"}}>
        <p style={{fontSize:"18px"}}> {allStudent ? 'See Verified Students' : 'See All Students'}</p>
        <ButtonCom text={<img src={filter} alt='Filter' width='20px' height='20px' />} onClick={() => setAllStudent(!allStudent)} />
      </div>
      <AllStudent apiEndpoint={allStudent ? 'dashboard/Teachers' : 'dashboard/Teachers/StudentForExam'} />
    </div>
  );
};

export default TeacherStu;
