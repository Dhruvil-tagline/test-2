import React, { useId } from 'react'

const RadioCom = ({ text, name, value, onChange, checked }) => {
  const id = useId();
  return (
    <><div >

      <input type='radio' style={{ height: '24px', width: '24px', verticalAlign: 'middle', margin: '0px 4px 0px 0px', }} checked={checked} id={id} name={name} onChange={onChange} value={value} />
      <label htmlFor={id}>{text}</label>
    </div>
    </>
  )
}

export default RadioCom
