import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { getRequest } from "../../utils/api";
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
                setExamData((prev) => ({
                    ...prev,
                    questions: response.data.questions,}));
            } else {
                console.log(response?.message);
            }
        };
        fetchExamDetails();
    }, [state.id]);

    return <TeacherForm existingExam={examData} examId={state.id}/>;
};

export default EditExam;
