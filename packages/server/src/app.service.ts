import { HttpStatus, Injectable } from "@nestjs/common";
import { Db } from "./db/db";
import { ReturnResponse } from "./returnResponse";

@Injectable()
export class AppService {
  constructor(private readonly db: Db) { }

  async getColumns() {
    const getColumns = await this.db.getColumns();
    return getColumns;
  }

  async getRows(tableName: string) {
    const tableData = await this.db.getRows(tableName);

    if (typeof tableData === "boolean")
      return new ReturnResponse(HttpStatus.NOT_FOUND, `Table not found`, {
        tableName,
      }).getResponse();

    const { registers, columns } = tableData;

    const tableInfo = [];
    const registersKeys = Object.keys(registers[0]);

    // WARNING: NO TOQUES ESTO, O SOS CDT
    registersKeys.forEach((key) => {
      columns.forEach((column) => {
        if (key === column.columnName) {
          tableInfo.push({
            columnName: key,
            dataType: column.dataType,
            UUID: crypto.randomUUID(),
          });
          return;
        }
      });
    });

    const tableWithId = registers.map((record) => ({
      values: { ...record },
      UUID: crypto.randomUUID(),
    }));

    return new ReturnResponse(HttpStatus.OK, "", {
      tableInfo,
      tableWithId,
      registersKeys,
    }).getResponse();
  }

  async execQuery(query: string) {
    const tableData = await this.db.execSql(query)

    const { registers, columns } = tableData;

    const tableInfo = [];
    const registersKeys = Object.keys(registers[0]);

    // WARNING: NO TOQUES ESTO, O SOS CDT
    registersKeys.forEach((key) => {
      columns.forEach((column) => {
        if (key === column.columnName) {
          tableInfo.push({
            columnName: key,
            UUID: crypto.randomUUID(),
          });
          return;
        }
      });
    });

    const tableWithId = registers.map((record) => ({
      values: { ...record },
      UUID: crypto.randomUUID(),
    }));

    return new ReturnResponse(HttpStatus.OK, "", {
      tableInfo,
      tableWithId,
      registersKeys,
    }).getResponse();
  }

}
