import './ComponentCss/table.css'

const Table = ({ tableHeader, tableData, dataNotFound }) => {
  return (
    <div style={{ overflow: "auto", maxHeight: "80vh" }}>
      <table style={{ width: "100%", height: "100%" }}>
        <thead >
          <tr>
            {!!tableHeader.length && tableHeader.map((val, index) => <th style={{ padding: "25px", background: 'black', color:"rgb(18, 219, 206)" }} key={index}>{val}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            !!tableData?.length ? tableData?.map((val, index) =>
              <tr key={index}>
                {!!tableHeader.length && tableHeader.map((item, idx) => <td style={{ textAlign: "center", padding: "15px", }} key={idx}> {val[item]}</td>)}
              </tr>
            ) : <tr style={{ textAlign: 'center', fontSize: '30px', height: "100px", background: 'black' }}>
              <td colSpan={tableHeader.length} style={{ color: 'red' }}>{dataNotFound ? 'Data not found' : 'Loading...'}</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default Table
