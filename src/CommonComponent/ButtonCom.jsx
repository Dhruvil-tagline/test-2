import './ComponentCss/button.css'

const ButtonCom = ({ onClick, text, type, disabled, color }) => {
  return (
    <>
      <button className='button' disabled={disabled} style={{ color: color || 'inherit', cursor: disabled ? 'not-allowed' : 'pointer'}} type={type} onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCom

