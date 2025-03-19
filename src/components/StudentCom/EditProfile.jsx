import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthProvider';
import { getRequest, putRequest } from '../../utils/api';
import { validateName } from '../../utils/validation';
import InputCom from '../../CommonComponent/InputCom';
import ButtonCom from '../../CommonComponent/ButtonCom';
import { useLoader } from '../../Context/LoaderProvider';
import './studCss/student.css'
import Loader from '../../CommonComponent/Loader';


const EditProfile = () => {
  const { token } = useAuth();
  const { setLoading } = useLoader();
  const [student, setStudent] = useState();
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const handleSubmit = async () => {
    setError('')
    let err = validateName(text);
    if (err) {
      setError(err);
      return;
    }
    if (text === student.name) {
      setError('Updated name is same as actual name')
      return;
    }
      setLoading(true)
    const response = await putRequest('student/studentProfile', { name: text }, { 'access-token': token });
    if (response.statusCode === 200) {
      toast.success('Name updated Successfully');
      setLoading(false)
    }
    else {
      console.log(response?.message?.error);
      toast.error(response?.message?.error || 'Error occurred');
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest('student/getStudentDetail', token);
      if (response.statusCode === 200) {
        setStudent(response.data);
      }
      else {
        toast.error(response?.message?.error || 'Error occurred');
      }
    }
    fetchData();
  }, [])

  return (
    <div style={{ maxWidth: '600px', width: '100%', margin: "30px 0px", padding: "20px", border: '1px solid gray', borderRadius: "10px", }}>
      <Loader/>
      <h1 className='heading'>Edit Profile</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px 0px" }}>
        <p>Name: {student?.name}</p>
        <p>Email: {student?.email}</p>
      </div>
      <hr className='horizontalRule' />
      <div style={{ marginTop: "10px" }}>
        <p>Change Name</p>
        <span className='error'>{error}</span>
        <InputCom type='text' name='name' id='name' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter your name...' />
        <ButtonCom text='Update name' onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default EditProfile
