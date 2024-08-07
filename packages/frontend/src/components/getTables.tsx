import { useEffect, useState } from "preact/hooks"
import { localUrl } from "../cons";
import "../css/sitevar.css"

interface ColumnName {
  columnName: string
  INTERNAL_UUID: string;
}

function GetTable({ children }) {
  const [tables, setTables] = useState<ColumnName[]>()

  useEffect(() => {
    async function getTables() {
      const f = await fetch(localUrl)
      const tables: ColumnName[] = await f.json()
      setTables(tables)
    }
    getTables()
  }, [])

  function choiseTable(table: string) {
    children(table)
  }

  return <>
    <div className="sidebar">
      <div>
        <h2>Tables</h2>

        <ul>
          {tables?.map(data => (
            <li key={data.INTERNAL_UUID}>
              <button onClick={() => choiseTable(data.columnName)}>
                {data.columnName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
}

export default GetTable
