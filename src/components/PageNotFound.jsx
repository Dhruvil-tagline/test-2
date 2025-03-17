import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonCom from '../CommonComponent/ButtonCom'

const PageNotFound = () => {
    const navigate = useNavigate()
  return (
    <div>
          <h1>Page not found</h1>
          <ButtonCom onClick={ ()=> navigate(-1)} text='Back'/>
    </div>
  )
}

export default PageNotFound
