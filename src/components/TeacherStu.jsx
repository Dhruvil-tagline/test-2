import React, { useState } from 'react';
import AllStudent from './TeacherStudentCom/AllStudent';
import ButtonCom from '../CommonComponent/ButtonCom';

const TeacherStu = () => {
  const [allStudent, setAllStudent] = useState(true);

  return (
    <div>
      <ButtonCom
        text={allStudent ? 'See Verified Students' : 'See All Students'}
        onClick={() => setAllStudent(!allStudent)}
      />
      <AllStudent apiEndpoint={allStudent ? 'dashboard/Teachers' : 'dashboard/Teachers/StudentForExam'} />
    </div>
  );
};

export default TeacherStu;
