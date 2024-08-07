import { Module, DynamicModule } from '@nestjs/common';
import * as pgPromise from 'pg-promise';
import { Db } from './db';
import { connection } from 'src/CONSTANTE';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';
const pgp = pgPromise();

Module({})
export class DbModule {
  static forRoot(dbConfig: IConnectionParameters): DynamicModule {
    const dbProvider = {
      provide: connection,
      useFactory: () => {
        return pgp(dbConfig)
      }
    }

    return {
      module: DbModule,
      providers: [dbProvider, Db],
      exports: [Db]
    }
  }
}
