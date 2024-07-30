import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './db/db.module';
import { Pool } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) { }

  async getColumns() {
    const sql = `SELECT table_name AS "columnName" FROM information_schema.tables WHERE table_schema = 'public';`
    const res = await this.conn.query(sql)

    const addId = res.rows.map(data => (
      {
        ...data,
        INTERNAL_UUID: crypto.randomUUID()
      }
    ))

    return addId
  }
}
