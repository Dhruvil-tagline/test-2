import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import { deleteRequest, getRequest } from '../../utils/api';
import ButtonCom from '../../CommonComponent/ButtonCom';
import Table from '../../CommonComponent/Table';



const ExamList = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [refetch, setRefetch] = useState(0);
    const [exams, setExams] = useState([]);
    const [dataNotFound, setDataNotFound] = useState(false);
    const handleExaView = async (exam) => { navigate(`/teacher/exam/${exam._id}`, { state: { subject: exam.subjectName, notes: exam.notes, id: exam._id } }); }
    const handleExaEdit = (exam) => { navigate(`/teacher/exam/edit/${exam._id}`, { state: { subject: exam.subjectName, notes: exam.notes, id: exam._id } }); }
    const handleExaDelete = async (id) => {
        let x = confirm('Are you sure want to Delete Exam?');
        if (x) {
            const response = await deleteRequest(`dashboard/Teachers/deleteExam?id=${id}`, token);
            if (response?.statusCode === 200) {
                toast.success('Exam deleted  Successfully');
                setRefetch(refetch + 1);
            } else {
                toast.error(response?.message);
            }
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getRequest("dashboard/Teachers/viewExam", token);
            if (response?.statusCode === 200) {
                setExams(response.data)
                setDataNotFound(true);
            }
            else {
                console.log(response?.message);
            }
        }
        fetchData();
    }, [refetch]);
    const tableHeader = ['Subject', 'Email', 'Notes', 'View Exam', 'Delete Exam'];
    const tableData = exams.map((val, index) => ({
        Subject: val.subjectName,
        Email: val.email,
        Notes: val.notes.join(', '),
        'View Exam': <ButtonCom text='View Exam' onClick={() => handleExaView(val)} color='green' />,
        'Delete Exam': <ButtonCom text='Delete Exam' onClick={() => handleExaDelete(val._id)} color='red' />
    }))
    return (
        <div>
            <Table tableHeader={tableHeader} tableData={tableData} />
        </div>
    )
}

export default ExamList
