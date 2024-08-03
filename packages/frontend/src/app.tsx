import { useState, useEffect } from 'preact/hooks'

interface ColumnName {
  columnName: string
  INTERNAL_UUID: string;
}

export function App() {
  const [tables, setTables] = useState<ColumnName[]>()
  const [selectRow, setSelectRow] = useState<string>()
  const [m, setM] = useState<[]>()

  useEffect(() => {
    async function getTables() {
      const f = await fetch("http://localhost:3000")
      const tables: ColumnName[] = await f.json()
      setTables(tables)
    }
    getTables()
  }, [])

  useEffect(() => {
    async function getColumns() {
      console.log(selectRow)
      const f = await fetch(`http://localhost:3000/pap?table=${selectRow}`)
      const json = await f.json()
      console.log(json)
      setM(json)
    }

    selectRow ? getColumns() : null
  }, [selectRow])


  return (
    <>
      <div className="layout-container">
        <aside>
          <nav>
            <ul>
              <li><h2>Tables</h2></li>
              {tables?.map(data => (
                <li key={data.INTERNAL_UUID}>
                  <button onClick={() => setSelectRow(data.columnName)}>
                    {data.columnName}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {m?.columns.map(data => (
                    <th key={data.columnName}> {data.columnName} ({data.dataType})</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {m?.columns.map(e => (
                    <td key={e.INTERNAL_UUID}>
                      {m?.registers.map(data => {
                        if (e.dataType === "date" || e.dataType === "timestamp with time zone") {
                          const date = new Date(data[e.columnName]);
                          const options = {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            timeZoneName: 'short'
                          };

                          const formatter = new Intl.DateTimeFormat('en-US', options);
                          const formattedDate = formatter.format(date);

                          data[e.columnName] = formattedDate
                        }
                        if (!data[e.columnName]) data[e.columnName] = "-"
                        return <p key={data.INTERNAL_UUID}>{data[e.columnName]}</p>
                      }

                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  )
}
