import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { getRequest } from "../../utils/api";
import ButtonCom from "../../CommonComponent/ButtonCom";
import Table from "../../CommonComponent/Table";
const tableHeader = ['Index', 'Question', 'Answer', 'Action'];

const ExamDetail = () => {
    const { token } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [dataNotFound, setDataNotFound] = useState(false);
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
                setDataNotFound(true);
            } else {
                console.log(response?.message);
                setDataNotFound(true);
            }
        };
        fetchExamDetails();
    }, [state.id]);

    const tableData = useMemo(() => {
        return examData?.questions?.map((q, index) => ({
            Index: index + 1,
            Question: q?.question,
            Answer: q?.answer,
            Action: <ButtonCom text='Edit' onClick={() => handleEdit(index)} />,
        }))
    }, [examData]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0px 20px" }}>
            <div style={{ padding: "0px 10px", display: 'flex', justifyContent: 'space-between', maxWidth: "900px", width: "100%", paddingBottom:"5px" }}>
                <h1 style={{ color: 'rgb(18, 219, 206 )' }}>{state.subject}</h1>
                <div>Notes: {state.notes.map((note, index) => (
                <p key={index}>• {note}</p>
            ))}</div>
            </div>
            <div style={{ width: "100%", maxWidth: "900px" }}>
                <Table tableData={tableData} tableHeader={tableHeader}  dataNotFound={dataNotFound}/>
            </div>
        </div>
    );
};

export default ExamDetail;
