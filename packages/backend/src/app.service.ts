import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './db/db.module';
import pg from 'pg-promise/typescript/pg-subset';
import pgPromise from 'pg-promise';
import { a } from './interface/getColumns';
import { register } from 'module';


@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: pgPromise.IDatabase<{}, pg.IClient>) { }

  async getColumns() {
    const sql = `SELECT table_name AS "columnName" FROM information_schema.tables WHERE table_schema = 'public';`
    const res = await this.conn.query(sql)
    const addId = res.map(data => (
      {
        ...data,
        INTERNAL_UUID: crypto.randomUUID()
      }
    ))

    return addId
  }

  async getRows(table: string) {
    // TODO: Obtener: nombre y tipo de la columna, los registros

    // Esto me devuelve los data type de cada columna pero desordenado
    const sql = 'select column_name AS "columnName", data_type AS "dataType" from information_schema.columns where table_name = $1;'
    let columns: a[] = (await this.conn.any(sql, table)).reverse()
    const registers: Array<{}> = await this.conn.query('SELECT * FROM ${table:name} LIMIT 3;', { table });
    const keys = {
      registersKeys: Object.keys(registers[0])
    }

    let a: { k: string[] } = {
      k: [],
    }

    // NOTE: idea
    // Hacer un Objeect.ket() para obtener los ket de los objetos
    // y comparar estos valores

    // NOTE:
    //  - Se me ocurrio usar esta sintaxis para "machear" 

    // WARNING: NO TOQUES ESTO, O SOS CDT
    columns.forEach(e => {
      registers.forEach(d => {
        if (d[e.columnName]) {
          a.k.push(d[e.columnName])
        }
      })
    } )

    return {
      a,
      columns,
      registers
    }
  }
}
