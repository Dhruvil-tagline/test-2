import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getRequest } from "../utils/api";
import { useAuth } from "../Context/AuthProvider";
import TeacherForm from "./TeacherForm";

const EditExam = () => {
    const { token } = useAuth();
    const {state} = useLocation();
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

    useEffect(() => {
        const fetchExamDetails = async () => {
            const response = await getRequest(`dashboard/Teachers/examDetail?id=${state.id}`, token);
            if (response?.statusCode === 200) {
                console.log(response);
                setExamData((prev) => ({
                    ...prev,
                    questions: response.data.questions,}));
            } else {
                console.log(response?.message);
            }
        };
        fetchExamDetails();
    }, [state.id]);

    if (!examData) return <h2>Loading...</h2>;

    return <TeacherForm existingExam={examData} examId={state.id}/>;
};

export default EditExam;
