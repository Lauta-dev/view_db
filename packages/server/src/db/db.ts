import {  Inject, Injectable } from "@nestjs/common";
import * as pgPromise from "pg-promise";
import { connection as CONNECTION } from "src/CONSTANTE";
import { TableColumns } from "src/interface/TablesColumns.interface";
import { ReturnResponse } from "src/returnResponse";
import { SQLQuerys } from "src/SQLQuerys";

Injectable();
export class Db {
  private db: pgPromise.IDatabase<any>;
  public constructor(
    @Inject(CONNECTION) private connection: pgPromise.IDatabase<any>,
  ) {
    this.db = connection;
  }

  private async checkIfTableExist(t: string): Promise<boolean> {
    // NOTE: Desconosco si solo se debe chequear el table_schema = public
    // Esto lo estoy testeando en PosgreSQL
    const result: { exists: boolean } = (
      await this.db.query(SQLQuerys.checkTableExists, t)
    )[0];
    return result.exists;
  }

  private async checkIfEmplyTable(tableName: string): Promise<boolean> {
    const result: { count: string }[] = await this.db.query(
      SQLQuerys.checkTableEmpty,
      { table: tableName },
    );
    const { count } = result[0];
    const countToNumber = Number(count);

    return Boolean(countToNumber);
  }

  public async getColumns() {
    const tablesNames: Pick<TableColumns, "columnName">[] = await this.db.query(
      SQLQuerys.getTableNames,
    );
    return tablesNames.map((data) => ({
      ...data,
      INTERNAL_UUID: crypto.randomUUID(),
    }));
  }

  async getRows(
    table: string,
  ): Promise<boolean | { columns: any[]; registers: any }> {
    const check = await this.checkIfTableExist(table);
    const checkTableEmply = await this.checkIfEmplyTable(table);

    if (!check) {
      return check;
    }

    if (!checkTableEmply) {
      return checkTableEmply;
    }

    const tableColumns: TableColumns[] = (
      await this.db.any(SQLQuerys.getTableColumn, table)
    ).reverse();

    const registers: unknown = (await this.db.query(SQLQuerys.getColumns, {
      table,
    })) as Array<{}>;

    return { columns: tableColumns, registers };
  }

  async execSql(query: string) {
    const registers: Array<{}> = (await this.db.query(query))

    console.log({q: query})

    const tableColumns: TableColumns[] = (
      await this.db.any(query)
    ).reverse();

    console.log(registers, tableColumns)

    return { columns: tableColumns, registers };
  }
}

