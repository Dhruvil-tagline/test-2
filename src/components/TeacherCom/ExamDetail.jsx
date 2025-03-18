import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { getRequest } from "../../utils/api";
import ButtonCom from "../../CommonComponent/ButtonCom";


const ExamDetail = () => {
    const { token } = useAuth();
    const { state } = useLocation();
    const [exam, setExam] = useState(null);
    console.log(exam)
    console.log(state.id);
    console.log(token)
    useEffect(() => {
        const fetchExamDetails = async () => {
            const response = await getRequest(`dashboard/Teachers/examDetail?id=${state.id}`, token);
            if (response?.statusCode === 200) {
                console.log(response.data)
                setExam(response.data);
            } else {
                console.log(response?.message);
            }
        };
        fetchExamDetails();
    }, [state.id]);

    if (!exam) return <h2>Loading Exam Details...</h2>;

    return (
        <div>
            <h1>Exam Details - {state.subject}</h1>
            <h3>Notes:</h3>
            {state.notes.map((note, index) => (
                <p key={index}>• {note}</p>
            ))}
            <h3>Questions:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {exam.questions.map((q, index) => (
                        <tr key={index} style={{ padding: "10px", borderBottom: "1px solid gray" }}>
                            <td>{index + 1}</td>
                            <td>{q.question}</td>
                            <td>{q.answer}</td>
                            <td><ButtonCom text='Edit' /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExamDetail;
