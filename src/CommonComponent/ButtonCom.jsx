import './ComponentCss/button.css'
const ButtonCom = ({ onClick, text, type, disabled }) => {
  return (
    <>
          <button className='button' disabled={disabled} style={{ border: '1px solid  transparent', borderRadius: '8px', padding: '0.6em 2em', fontSize: '1em', background:'#1a1a1a',cursor:'pointer', }} type={type} onClick={onClick}>{text}</button>
    </>
  )
}

export default ButtonCom

