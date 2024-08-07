import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from "./app.controller"
import { DbModule } from './db/db.module';
import { Db } from './db/db';

@Module({
  // TODO: Pasar los parametros por las variables de entorno
  imports: [DbModule.forRoot({
    host: "172.20.0.2",
    password: "example",
    user: "lauta",
    database: "lauta",
    port: 5432

  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
