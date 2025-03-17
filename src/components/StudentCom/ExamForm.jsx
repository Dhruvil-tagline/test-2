import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getRequest, postRequest } from '../../utils/api';
import { useAuth } from '../../Context/AuthProvider';
import RadioCom from '../../CommonComponent/RadioCom';
import ButtonCom from '../../CommonComponent/ButtonCom';

const ExamForm = () => {
    const { state } = useLocation();
    const { token } = useAuth();
    const { id, subjectName, notes } = state;
    const [exam, setExam] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [reviewMode, setReviewMode] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let response = await getRequest(`student/examPaper?id=${id}`, token);
            if (response) {
                console.log(response)
            }
            if (response.statusCode === 200) {
                console.log(response.data);
                setExam(response.data);
                let temArray = response.data.map((val) => {
                    return { "question": val._id, "answer": "" }
                })
                setSelectedAnswers(temArray);
            }
            else {
                console.log(response?.error?.message)
            }
        }
        fetchData()
    }, []);

    const handleAnswerSelect = (questionId, option) => {
        let x = selectedAnswers.map((val) => {
            if (val?.question === questionId) {
                return { "question": questionId, "answer": option }
            }
            else {
                return val;
            }
        });
        console.log(x)
        setSelectedAnswers(x);
    };


    const handleNext = () => {
        setCurrentQuestionIndex((prev) => prev + 1);
    };
    const handlePrev = () => {
        setCurrentQuestionIndex((prev) => prev - 1);
    };
    const handleSubmitAndReview = () => {
        setReviewMode(true);
        setIsEditing(true);
    };
    const handleEditAnswer = (index) => {
        setCurrentQuestionIndex(index);
        setReviewMode(false);
    };
    const handleSubmit = async () => {
        console.log(selectedAnswers)
        const response = await postRequest(`student/giveExam?id=${id}`, selectedAnswers, { 'access-token': token });
        if (response) {
            console.log(response)
        }
        if (response.statusCode === 200) {
            console.log(response.data);
        }
        else {
            console.log(response?.error?.message)
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ margin: "20px", padding: "15px", maxWidth: "600px", width: "100%", border: "1px solid gray", borderRadius: '10px   ' }}>

                <h1 style={{ textAlign: 'center' }}>ExamForm</h1>
                <div>
                    <hr />
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0px" }}>
                        <p>Subject : {subjectName}</p>
                        <div>Notes:
                            {!!notes?.length && notes.map((res, idx) => (
                                <div key={idx}>
                                    <p>{res}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        {!reviewMode ? (
                            <div>
                                <p style={{ margin: "10px 0px", fontSize: '20px' }}>Question {currentQuestionIndex + 1}: {exam[currentQuestionIndex]?.question}</p>
                                <div style={{ display: "flex", gap: "15px" }}>
                                    {exam[currentQuestionIndex]?.options.map((opt, index) => {
                                        return (
                                            <RadioCom
                                                key={index}
                                                text={opt}
                                                value={opt}
                                                name={`option-${currentQuestionIndex}`}
                                                checked={selectedAnswers[currentQuestionIndex]?.answer === opt}
                                                onChange={() => handleAnswerSelect(exam[currentQuestionIndex]?._id, opt)}
                                            />
                                        )
                                    })}
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", margin: "10px 0px" }}>
                                    <ButtonCom text="Previous" onClick={handlePrev} disabled={currentQuestionIndex === 0} />
                                    {(isEditing && currentQuestionIndex !== exam.length -1 ) && <ButtonCom text="Submit and Review" onClick={handleSubmitAndReview} />}
                                    {currentQuestionIndex < exam.length - 1 ? (
                                        <ButtonCom text="Next" onClick={handleNext} />
                                    ) : (
                                        <ButtonCom text="Submit and Review" onClick={handleSubmitAndReview} />
                                    )}
                                </div>

                            </div>
                        ) : (
                            <div>
                                    <h2>Review Your Answers</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                            <th>Index</th>
                                            <th>Question</th>
                                            <th>Anser</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {exam.map((q, idx) => (
                                                <tr key={q._id} style={{ margin: "10px 0px" }}>
                                                    <td>{ idx + 1}</td>
                                                    <td>{q.question}</td>
                                                    {selectedAnswers[idx].answer ? <td style={{ color: 'green' }}>{selectedAnswers[idx]?.answer}</td> : <td style={{ color: "red" }}>Not Answered</td>}
                                                    <td>
                                                    <ButtonCom text="Edit Answer" onClick={() => handleEditAnswer(idx)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                {/* {exam.map((q, idx) => (
                                    <div key={q._id} style={{ margin: "10px 0px" }}>
                                        <p>Question {idx + 1}: {q.question}</p>
                                        Answer:
                                        {selectedAnswers[idx].answer ? <span style={{ color: 'green' }}>{selectedAnswers[idx]?.answer}</span> : <span style={{ color: "red" }}>Not Answered</span>}
                                        <ButtonCom text="Edit Answer" onClick={() => handleEditAnswer(idx)} />
                                        <hr style={{ border: "0.1px dashed gray" }} />
                                    </div>
                                ))} */}
                                <ButtonCom text="Final Submit" onClick={handleSubmit} />
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ExamForm
