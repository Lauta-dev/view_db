import { Module } from '@nestjs/common';
import * as pgPromise from 'pg-promise';

export const PG_CONNECTION = "PG_CONNECTION"

const pgp = pgPromise()

const opts = {
  port: 5432,
  password: "example",
  host: "172.20.0.2",
  database: "lauta",
  user: "lauta",
}

const db = pgp(opts)

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: db
}

@Module({
  providers: [dbProvider], exports: [dbProvider]
})
export class DbModule {
 
}
