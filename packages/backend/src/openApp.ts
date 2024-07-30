import { Client, ClientConfig } from "pg"

export class OpenApp {
  private constructor() { }
  private client: Client;
  private static instance: OpenApp;

  public static getIntence(): OpenApp {
    if (!OpenApp.instance) {
      OpenApp.instance = new OpenApp()
    }
    return OpenApp.instance
  }

  public upConnection(config?: ClientConfig) {
    const opts: ClientConfig = {
      port: 5432,
      password: "example",
      host: "172.18.0.2",
      database: "lauta",
      user: "postgres",
    }

    this.client = new Client(opts);
    this.client.connect().then()
  }

  public execQuery(query: string) {
    return this.client.query(query)
  }
}
