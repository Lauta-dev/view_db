import { useState, useEffect } from 'preact/hooks'
import { JSX } from 'preact';
import { Link, Route } from "wouter-preact"

interface ColumnInfo {
  columnName: string;
  dataType: string;
  INTERNAL_UUID: string;
}

interface ColumnName {
  columnName: string
  INTERNAL_UUID: string;
}

interface A {
  key: ColumnInfo[]
  values: object[]
}

export function App() {
  const [tables, setTables] = useState<ColumnName[]>()
  const [selectRow, setSelectRow] = useState<string>()
  const [d, setD] = useState<A>()

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
      const f = await fetch(`http://localhost:3000/columns?column=${selectRow}`)
      const json = await f.json()
      const tableInfo: ColumnInfo[] = json.info
      setD({ values: json.value, key: tableInfo })
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
                  {d?.key.map(data => (
                    <th key={data.columnName}>{data.columnName} ({data.dataType})</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {d?.key.map(e => (
                    <td key={e.INTERNAL_UUID}>
                      {d.values.map(data => (
                        <p key={data.INTERNAL_UUID}>{data.tableValue[e.columnName]}</p>
                      ))}
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
