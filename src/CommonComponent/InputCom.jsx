
function InputCom({ name, id, value, onChange, type, placeholder}) {
  return (
    <div style={{padding:'10px 0px',}}>
          <input placeholder={placeholder} style={{ padding: '8px', width: '100%', fontSize: '1.4rem', borderRadius: '5px', backgroundColor:'transparent',border: '1px solid gray'}} type={type} value={value} onChange={onChange} name={name} id={id} />
    </div>
  )
}

export default InputCom
