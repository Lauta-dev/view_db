export interface Server {
  server: ServerClass
}

export interface ServerClass {
  statusCode: number
  returnData: ReturnData
}

export interface ReturnData {
  tableInfo: TableInfo[]
  tableWithId: TableWithID[]
  registersKeys: string[]
  registers: Register[]
}

export interface Register {}

export interface TableInfo {
  UUID: string
  columnName: string
  dataType: string
}

export interface TableWithID {
  values: Register
  UUID: string
}
