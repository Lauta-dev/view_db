import { Module, DynamicModule } from "@nestjs/common";
import * as pgPromise from "pg-promise";
import { Db } from "./db";
import { connection } from "src/CONSTANTE";
import { IConnectionParameters } from "pg-promise/typescript/pg-subset";
import { ConfigModule, ConfigService } from "@nestjs/config";
const pgp = pgPromise();

Module({});
export class DbModule {
	static forRoot(dbconfig: IConnectionParameters): DynamicModule {
		const dbProvider = {
			provide: connection,
			useFactory: () => {
				return pgp(dbconfig);
			},
			inject: [ConfigService],
		};

		return {
			module: DbModule,
			providers: [dbProvider, Db],
			exports: [Db],
			imports: [ConfigModule],
		};
	}
}
