import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { DbModule } from "./db/db.module";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		DbModule.forRoot({
			host: process.env.POSTGRES_HOST,
			password: process.env.POSTGRES_PASSWORD,
			user: process.env.POSTGRES_USER,
			database: process.env.POSTGRES_DB,
			port: Number(process.env.POSTGRES_PORT),
		}),
		ConfigModule.forRoot({
			envFilePath: "../../../.env",
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
