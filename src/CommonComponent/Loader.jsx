import React from 'react'
import './ComponentCss/Loader.css'
const Loader = ({ loading, children }) => {
  return (
      <div style={{ width: '100vw', height: "80vh", display: "flex", alignItems: "center", justifyContent: "center",position:"relative" }}>
          
          {loading && <div style={{ position: 'absolute', width: "100vw", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><span className="loader"></span></div> }
          {children}
      </div>
  )
}

export default Loader
