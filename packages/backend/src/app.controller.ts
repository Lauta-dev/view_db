import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async sayHi() {
    return this.appService.getColumns()
  }

  @Get("pap")
  async b(@Query('table') table: string) {
    return this.appService.getRows(table)
  }
}
