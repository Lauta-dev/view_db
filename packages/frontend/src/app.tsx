import { useState, useEffect } from 'preact/hooks'
import GetTable from './components/getTables'
import { localUrl } from './cons'
import "./css/container.css"
import "./css/table.css"

// TODO: URGENTE: Arreglar los estilos de esta app de mierda

export function App() {
  const [selectRow, setSelectRow] = useState<string>()
  const [m, setM] = useState<[]>()

  useEffect(() => {
    async function getColumns() {
      const f = await fetch(`${localUrl}/t?table=${selectRow}`)
      const json = await f.json()
      setM(json)
    }

    selectRow ? getColumns() : null
  }, [selectRow])

  function choiseTable(table: string) {
    setSelectRow(table)
  }

  return (
    <>
      <div className="container">
        <GetTable children={choiseTable} />

        <div className="t-container">
          <table>
            <thead>
              <tr>
                {m?.a.map(data => (
                  <th key={data.columnName}> {data.columnName} ({data.dataType})</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="tt">
                {m?.a.map(e => (
                  <td  key={e.INTERNAL_UUID}>
                    {m?.reg.map(data => {
                      // TODO: Mover esto a otro archivo
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
                      return <p key={data.INTERNAL_UUID}>{data[e.columnName].toString()}</p>
                    }

                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </>
  )
}
