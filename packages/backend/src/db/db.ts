import { Inject, Injectable } from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import { connection } from 'src/CONSTANTE';
import { TableColumns } from 'src/interface/TablesColumns.interface';
import { SQLQuerys } from 'src/SQLQuerys';

Injectable()
export class Db {
  private db: pgPromise.IDatabase<any>;
  public constructor(@Inject(connection) private connection: pgPromise.IDatabase<any>) {
    this.db = connection
  }

  private async checkIfTableExist(t: string): Promise<boolean> {
    // NOTE: Desconosco si solo se debe chequear el table_schema = public
    // Esto lo estoy testeando en PosgreSQL
    const result: { exists: boolean } = (await this.db.query(SQLQuerys.checkTableExists, t))[0]
    return result.exists
  }

  public async getColumns() {
    const tablesNames: Pick<TableColumns, "columnName">[] = await this.db.query(SQLQuerys.getTableNames)
    return tablesNames.map(data => ({ ...data, INTERNAL_UUID: crypto.randomUUID() }))
  }

  async getRows(table: string): Promise<boolean | { columns: any[]; registers: any; }> {
    const check = await this.checkIfTableExist(table)
    if (!check) return check

    const tableColumns: TableColumns[] = (await this.db.any(SQLQuerys.getTableColumn, table)).reverse()
    const registers: Object[] = await this.db.query(SQLQuerys.getColumns, { table });

    return { columns: tableColumns, registers }
  }
}
