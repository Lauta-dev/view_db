import { useEffect, useState } from 'react'
import { localUrl } from '@src/cons'
import { Button } from '@src/shadcn/ui/button'

import '@css/sitevar.css'

interface ColumnName {
  columnName: string
  INTERNAL_UUID: string
}

function GetTable({ children }) {
  const [tables, setTables] = useState<ColumnName[]>()

  useEffect(() => {
    async function getTables(): Promise<void> {
      const f = await fetch(localUrl)
      const tables: ColumnName[] = await f.json()
      setTables(tables)
    }
    getTables()
  }, [])

  function choiseTable(table: string) {
    children(table)
  }

  return (
    <>
      <div className="sidebar">
        {tables ? <div>
          <h2>Tables</h2>
          <ul>
            {tables.map(table =>
              <li key={table.INTERNAL_UUID}>
                <Button
                  variant={"outline"}
                  className="w-full text-left"
                  onClick={() => choiseTable(table.columnName)}>
                  {table.columnName}
                </Button>
              </li>
            )
            }
          </ul>
        </div> : "No"}
      </div>
    </>
  )
}

export default GetTable
