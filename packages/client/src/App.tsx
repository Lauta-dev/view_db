import { useState, useEffect } from 'react'
import GetTable from '@components/getTables'
import { localUrl } from '@src/cons'
import { ReturnData, Server } from '@interface/server.interface'
import '@css/container.css'
import '@css/table.css'

import ToolBar from "@src/components/ToolBar"
import TableOfSQL from '@src/components/Table'

export default function App() {
  const [selectRow, setSelectRow] = useState<string>()
  const [data, setData] = useState<ReturnData>()
  const [errorInFetch, setErrorInFetch] = useState<boolean>(false)
  const [sqlQuery, setSqlQuery] = useState<string>()

  useEffect(() => {
    async function getColumns() {
      setErrorInFetch(false)

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

  useEffect(() => {
    async function execQuery() {
      setErrorInFetch(false)
      const replaceSpace = encodeURIComponent(sqlQuery ?? "")

      try {
        const fetchData = await fetch(`/api/exec?query=${replaceSpace}`)
        const response = await fetchData.json()
        const data = response.server.returnData

        console.log({data, sqlQuery, replaceSpace})
        setData(data)
      } catch (error) {
        setErrorInFetch(true)
      }
    }

    sqlQuery !== undefined
      ? execQuery()
      : null

  }, [sqlQuery])

  function choiseTable(table: string) {
    setSelectRow(table)
  }

  function handleQuery(query: string) {
    setSqlQuery(query)
  }

  return (
    <>
      <div className="container">
        <GetTable children={choiseTable} />

        <div className="t-container">
          {errorInFetch || data == undefined ? (
            'no'
          ) : (
            <>
              <ToolBar
                registerTotal='1000'
                registersView='50'
                tableName={selectRow ?? ""}
                query={handleQuery}
              />
              <TableOfSQL TableColumns={data} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
