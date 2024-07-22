import { useState, useEffect } from 'preact/hooks'
import { JSX } from 'preact';

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

  function onchangeoption(event: JSX.TargetedEvent<HTMLSelectElement, Event>) {
    event.currentTarget.value !== "default" ? setSelectRow(event.currentTarget.value) : null
  }

  return (
    <>
      <select onChange={event => onchangeoption(event)}>
        <option value="default">Some option</option>
        {tables?.map(data => (
          <option key={data.INTERNAL_UUID} value={data.columnName}>{data.columnName}</option>
        ))}
      </select>

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
    </>
  )
}
