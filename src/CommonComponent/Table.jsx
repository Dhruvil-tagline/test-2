import React from 'react'
import './ComponentCss/table.css'

const Table = ({ minWidth, maxWidth, tableHeader, tableData, dataNotFound }) => {
  return (
    <div style={{ padding: "10px", overflowX: "auto", display: "flex", justifyContent: "center", alignItems: "center", margin:"10px"}}>
      <table style={{ minWidth: minWidth || '900px', width: "100%", maxWidth: maxWidth || '1400px' }}>
        <thead >
          <tr>
            {!!tableHeader.length && tableHeader.map((val, index) => <th style={{ padding: "20px", background: 'black' }} key={index}>{val}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            !!tableData?.length ? tableData?.map((val, index) =>
              <tr key={index}>
                {!!tableHeader.length && tableHeader.map((item, idx) => <td style={{ textAlign: "center", padding: "15px", }} key={idx}> {val[item]}</td>)}
              </tr>
            ) : <tr style={{ textAlign: 'center', fontSize: '30px', height: "100px", background: 'black' }}><td colSpan={tableHeader.length} style={{ color: 'red' }}>{dataNotFound ? 'Data not found' : 'Loading...'}</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default Table
