import { useState, useEffect } from 'preact/hooks'
import GetTable from './components/getTables'
import { localUrl } from './cons'
import "./css/container.css"
import "./css/table.css"
import { ReturnData, Server } from './interface/server.interface'

// TODO: Arreglar los estilos de esta app de mierda

export function App() {
  const [selectRow, setSelectRow] = useState<string>()
  const [data, setData] = useState<ReturnData>()
  const [errorInFetch, setErrorInFetch] = useState<boolean>(false)

  useEffect(() => {
    async function getColumns() {
      setErrorInFetch(false);

      try {
        const fetchData = await fetch(`${localUrl}/t?table=${selectRow}`)
        const { server }: Server = await fetchData.json()

        if (server.statusCode !== 200) {
          setErrorInFetch(true)
          return 0
        }

        setData(server.returnData)
      } catch (error) {
        setErrorInFetch(true)
      }
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
          {errorInFetch ? "no" : <>
            <table>
              <thead>
                <tr>
                  {data?.tableInfo.map(data => (
                    <th key={data.columnName}> {data.columnName} ({data.dataType})</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="tt">
                  {data?.tableInfo.map(e => (
                    <td key={e.UUID}>
                      {data?.registers.map(data => {
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
                        return <p key={data[e.columnName]}>{data[e.columnName].toString()}</p>
                      }

                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </>}
        </div>
      </div>


    </>
  )
}
