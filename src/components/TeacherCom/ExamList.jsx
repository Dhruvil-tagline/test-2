import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import { deleteRequest, getRequest } from '../../utils/api';
import ButtonCom from '../../CommonComponent/ButtonCom';



const ExamList = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [refetch, setRefetch] = useState(0);
    const [exams, setExams] = useState([]);
    const handleExaView = async (exam) => {
        // const response = await getRequest(`dashboard/Teachers/examDetail?id=${id}`, token);
        // (response?.statusCode === 200) ? console.log(response.data) : console.log(response?.message);
        navigate(`/teacher/exam/${exam._id}`, {
            state: {
                subject: exam.subjectName,
                notes: exam.notes,
                id: exam._id
            }
        });

    }
    const handleExaEdit = (exam) => {
        navigate(`/teacher/exam/edit/${exam._id}`, {
            state: {
                subject: exam.subjectName,
                notes: exam.notes,
                id: exam._id
            }
        });

    }
    const handleExaDelete = async (id) => {
        const response = await deleteRequest(`dashboard/Teachers/deleteExam?id=${id}`, token);
        if (response?.statusCode === 200) {
            toast.success('Exam deleted  Successfully');
            setRefetch(refetch + 1);
        } else {
            toast.error(response?.message);
        }
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest("dashboard/Teachers/viewExam", token);
            if(response){
                console.log(response)
            }
            (response?.statusCode === 200) ? setExams(response.data) : console.log(response?.message);
        }
        fetchData();
    }, [refetch])
    return (
        <div>
            <h1>ExamList</h1>
            {
                exams && exams.map((val, index) => (
                    <div key={index} style={{ maxWidth: "600px", border: '1px solid gray', padding: '20px', borderRadius: '10px' }}>
                        <div>
                            <h1>Subject Name {' '}
                                {val.subjectName}</h1>
                        </div>
                            <div>
                            <h1>Email {val.email}</h1>
                        </div>
                        <div>
                            <label>Notes</label>
                            {val.notes && val.notes.map((val, index) => (
                                <div key={index}>* {val} || </div>
                            ))}
                        </div>
                  
                        <div style={{ display: 'flex', gap: '15px', padding: '10px', flexWrap: 'wrap' }}>
                            <ButtonCom text='View Exam' onClick={() => handleExaView(val)} />
                            <ButtonCom text='Edit Exam' onClick={() => handleExaEdit(val)} />
                            <ButtonCom text='Delete Exam' onClick={() => handleExaDelete(val._id)} />
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default ExamList
