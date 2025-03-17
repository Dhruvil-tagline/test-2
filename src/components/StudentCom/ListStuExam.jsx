import React, { useEffect, useState } from 'react'
import { getRequest } from '../../utils/api'
import ButtonCom  from '../../CommonComponent/ButtonCom';
import { useAuth } from '../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom';
import Table from '../../CommonComponent/Table';

const ListStuExam = () => {
  const { token } = useAuth();
  const [exam, setExam] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let response = await getRequest('student/studentExam', token);
      if (response) {
        console.log(response)
      }
      if (response.statusCode === 200) {
        console.log(response.data);
        setExam(response.data);
      }
      else {
        console.log(response?.error?.message)
      }
    }
    fetchData()
  }, [])
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* <Table thead={['Index','Subject Name','Email','Notes','Action']} tbody={[]} /> */}
      <table>
        <tr>
          <th>Index</th>
          <th>Subject Name</th>
          <th>Email</th>
          <th>Notes</th>
          <th>Action</th>
        </tr>
        {
          !!exam.length && exam.map((val,index) => (
            <tr key={val?._id}>
              <td>{index + 1}</td>
              <td>{val?.subjectName}</td>
              <td>{val?.email}</td> 
              <td>{ 
                !!val?.notes?.length && val?.notes.map((res, index) => (
                  <p key={index}>{res}</p>
                    ))
              }</td>
              {!!val?.Result?.length ? (<ButtonCom text='View result' onClick={() => navigate('/student/result', { state: val })} />)
                : (<ButtonCom text='Start Exam' onClick={() => navigate('/student/examForm', { state: { id: val._id, subjectName: val.subjectName, notes: val.notes } })} />)}
            </tr>
          ))
        }
      </table>
      {/* {
        !!exam.length && exam.map((val) => (
          <div style={{ border: '1px solid gray', borderRadius: "10px", padding: '10px' }}>
            <div>
            {!!val?.Result?.length ? ( val?.Result.map((res) => (
              <div>
                <p>{res.subjectName }</p>
                <p>{ res.score}</p>
                <p>{ res.rank}</p>
                <p>{res._id}</p>
                <p>{res.resultStatus}</p>
              </div>
            ))) : (<div>
                  <p>Email: {val?.email}</p>
                  <div>Notes:
                    {!!val?.notes?.length && val?.notes.map((res, index) => (
                      <div key={index}>
                        <p>{res}</p>
                      </div>
                    ))}
                  </div>
                  <p>Subject : {val.subjectName}</p>
                  <ButtonCom text='Start Exam' onClick={() => navigate('/student/examForm', { state: { id: val._id, subjectName: val.subjectName, notes: val.notes } })} />
            </div>)}
           
            </div>
          </div>
        ))
      } */}
    </div>
  )
}

export default ListStuExam
