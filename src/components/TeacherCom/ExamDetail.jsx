import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { getRequest } from "../../utils/api";
import ButtonCom from "../../CommonComponent/ButtonCom";
import Table from "../../CommonComponent/Table";


const ExamDetail = () => {
    const { token } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const initialSubject = state?.subject || "";
    const initialNotes = state?.notes || ["", ""];
    const [examData, setExamData] = useState({
        subjectName: initialSubject,
        notes: initialNotes,
        questions: Array(15).fill().map(() => ({
            question: "",
            answer: "",
            options: ["", "", "", ""],
        })),
    });

    const handleEdit = (index) => {
        navigate(`/teacher/exam/edit/${state.id}`, { state: { subject: initialSubject, notes: initialNotes, examId: state.id, currentQ: index, existingExam: examData } })
    }

    useEffect(() => {
        const fetchExamDetails = async () => {
            const response = await getRequest(`dashboard/Teachers/examDetail?id=${state.id}`, token);
            if (response?.statusCode === 200) {
                setExamData((prev) => ({
                    ...prev,
                    questions: response.data.questions,
                }));
            } else {
                console.log(response?.message);
            }
        };
        fetchExamDetails();
    }, [state.id]);

    const tableHeader = ['Index', 'Question', 'Answer', 'Action'];
    console.log(examData)
    const tableData = examData?.questions?.map((q, index) => ({
        Index: index + 1,
        Question: q?.question,
        Answer: q?.answer,
        Action: <ButtonCom text='Edit' onClick={() => handleEdit(index)} />,
    }))
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ padding: "0px 30px", display: 'flex', justifyContent: 'space-between', maxWidth: "900px", width: "100%" }}>
                <h1>{state.subject}</h1>
                <p>Notes:
            {state.notes.map((note, index) => (
                <p key={index}>• {note}</p>
            ))}</p>
            </div>
            <Table tableData={tableData} tableHeader={tableHeader} maxWidth='900px' />
        </div>
    );
};

export default ExamDetail;
