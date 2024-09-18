import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@src/shadcn/ui/table'

import { ReturnData } from "@interface/server.interface"
export default function TableOfSQL({ TableColumns }: { TableColumns: ReturnData }) {
  const { tableWithId, registersKeys} = TableColumns

  console.log({TableColumns})
  return <>
    {JSON.stringify(TableColumns, null, 4)}
    <Table>
    <TableHeader>
      <TableRow>
        {registersKeys.map((data) => (
          <TableHead key={data}>
            {data}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="tt">
        {registersKeys.map((e) => (
          <>
            <TableCell key={crypto.randomUUID()}>
              {tableWithId.map((data) => {
                  let newData = data.values[e]

                  if (data.values[e].type === "Buffer") {
                    newData = data.values[e] = "*"
                  }

                return <p key={crypto.randomUUID()}>{newData}</p>
              })}
            </TableCell>
          </>
        ))}
      </TableRow>
    </TableBody>
  </Table>
  </>
}
