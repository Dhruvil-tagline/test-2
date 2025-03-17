import React from 'react'
import { useLocation } from 'react-router-dom'

const StudentResult = () => {
  const { state } = useLocation();
  console.log(state)
  return (
    <div>
      <div>
      <p>{state?.email}</p>
      {
        !!state?.Result?.length && state?.Result.map((res) => (
          <div key={res._id}>
            <p>Subject Name: {res?.subjectName}</p>
            <p>Score: {res?.score}</p>
            <p>Rank: {res?.rank}</p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default StudentResult
