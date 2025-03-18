import './ComponentCss/button.css'
const ButtonCom = ({ onClick, text, type, disabled, color }) => {
  return (
    <>
      <button className='button' disabled={disabled} style={{ color: color || 'white' }} type={type} onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCom

