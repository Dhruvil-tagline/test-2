import { useId } from 'react'
import './ComponentCss/radio.css'

const RadioCom = ({ text, name, value, onChange, checked }) => {
  const id = useId();
  return (
    <>
      <div>
        <input type='radio' className='radio' checked={checked} id={id} name={name} onChange={onChange} value={value} />
        <label htmlFor={id}>{text}</label>
      </div>
    </>
  )
}

export default RadioCom
