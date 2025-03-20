import './ComponentCss/button.css'

const ButtonCom = ({ onClick, text, type, disabled, color }) => {
  return (
    <>
      <button className='button' disabled={disabled} style={{ cursor: disabled ? 'not-allowed' : 'pointer', "--button-color": color,}} type={type} onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCom

