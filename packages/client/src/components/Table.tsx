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
  const { tableInfo, tableWithId } = TableColumns

  return <Table>
    <TableHeader>
      <TableRow>
        {tableInfo.map((data) => (
          <TableHead key={data.UUID}>
            {' '}
            {data.columnName} ({data.dataType ?? "not exist"})
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="tt">
        {tableInfo.map((e) => (
          <>
            <TableCell key={crypto.randomUUID()}>
              {tableWithId.map((data) => {
                if (e.dataType === 'bytea') {
                  data.values[e.columnName] = 'bit'
                }

                const o = data.values[e.columnName]
                return <p key={crypto.randomUUID()}>{o}</p>
              })}
            </TableCell>
          </>
        ))}
      </TableRow>
    </TableBody>
  </Table>
}
