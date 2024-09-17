import { Controller, Get, Query, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getColumns() {
    return this.appService.getColumns();
  }

  @Get("t")
  async getRows(@Res() res: Response, @Query("table") tableName: string) {
    const response = await this.appService.getRows(tableName);
    return res.status(response.server.statusCode).send(response);
  }

  @Get("exec")
  async execQuery(@Res() res: Response, @Query("query") query: string) {
    console.log({query})
    const response = await this.appService.execQuery(query)
    return res.status(200).send(response)
  }
}
