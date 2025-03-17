import React from 'react'

const DropDown = ({value,onChange, dropObj,id, name, }) => {
  return (
      <div style={{ padding: '10px 0px', }}>
          <select
              style={{ padding: '8px', width: '100%', fontSize: '1.4rem', borderRadius: '5px', backgroundColor: 'transparent', border: '1px solid gray' }} 
              value={value} onChange={onChange} id={id} name={name}>
              {
                  dropObj.map((val) => (
                      <option key={val.value} value={val.value}>{val.text}</option>
                  ))
              }
        </select>
    </div>
  )
}

export default DropDown
