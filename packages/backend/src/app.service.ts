import { HttpStatus, Injectable } from '@nestjs/common';
import { Db } from './db/db';
import { ReturnResponse } from './returnResponse';

@Injectable()
export class AppService {
  constructor(private readonly db: Db) { }

  async getColumns() {
    const getColumns = await this.db.getColumns()
    return getColumns
  }

  async getRows(tableName: string) {
    const tableData = await this.db.getRows(tableName)

    if (typeof tableData === "boolean")
      return new ReturnResponse(HttpStatus.NOT_FOUND, `Table not found`, { tableName }).getResponse()

    const { registers, columns } = tableData

    const tableInfo = []
    const registersKeys = Object.keys(registers[0])

    // WARNING: NO TOQUES ESTO, O SOS CDT
    columns.forEach(column => {
      registersKeys.forEach(data => {
        if (data === column.columnName) {
          tableInfo.push({
            UUID: crypto.randomUUID(),
            columnName: data,
            dataType: column.dataType
          })
        }
      })
    })

    const tableWithId = registers.map(record => ({ values: { ...record }, UUID: crypto.randomUUID() }))

    return new ReturnResponse(HttpStatus.OK, "", {
      tableInfo,
      tableWithId,
      registersKeys,
      registers
    }).getResponse()
  }
}
