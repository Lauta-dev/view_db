import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { ClientConfig, Pool } from 'pg';
export const PG_CONNECTION = "PG_CONNECTION"

const opts: ClientConfig = {
  port: 5432,
  password: "example",
  host: "172.18.0.2",
  database: "lauta",
  user: "postgres",
}

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool(opts)
}

@Module({
  providers: [dbProvider], exports: [dbProvider]
})
export class DbModule implements OnModuleDestroy {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) { }

  async onModuleDestroy() {
    await this.conn.end();
  }
}
