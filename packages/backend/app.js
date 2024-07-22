import express from "express";
import pg from "pg";
import cors from "cors";
import format from "pg-format";

const { Client } = pg;

// TODO: Se me ocurre cargar esto usando .env o params al usar el docker
const client = new Client({
  port: 5432,
  password: "example",
  host: "172.18.0.2",
  database: "lauta",
  user: "postgres",
});
client.connect().then((e) => e);

const app = express();
app.use(cors());
const port = 3000;
app.get("/", async (req, res) => {
  const sql = `SELECT table_name AS "columnName" FROM information_schema.tables WHERE table_schema = 'public';`;
  const tables = await client.query(sql);
  const a = tables.rows.map((row) => ({
    ...row,
    INTERNAL_UUID: crypto.randomUUID(),
  }));

  res.json(a);
});

app.get("/columns", async (req, res) => {
  const queryParam = req.query.column;
  const sql = {
    getColumns: `SELECT * FROM %I`,
    getTableInfo: `SELECT column_name AS "columnName", data_type AS "dataType" FROM information_schema.columns WHERE table_name = '%I'`,
  };
  let tableInfo = [];

  const getColumns = await client.query(format(sql.getColumns, queryParam));
  const getTableInfo = await client.query(format(sql.getTableInfo, queryParam));

  // TODO: Simplificar esto
  getColumns.fields.forEach((field) => {
    getTableInfo.rows.forEach((data) => {
      if (data.columnName === field.name) {
        tableInfo.push({
          columnName: data.columnName,
          dataType: data.dataType,
          INTERNAL_UUID: crypto.randomUUID(),
        });
      }
    });
  });

  const addUUID = () => {
    return getColumns.rows.map((data) => ({
      tableValue: data,
      INTERNAL_UUID: crypto.randomUUID(),
    }));
  };

  let completeInfo = {
    info: tableInfo,
    value: addUUID(),
  };

  res.json(completeInfo);
});

app.listen(port, () => console.info(`Server listen in localhost:${port}`));
