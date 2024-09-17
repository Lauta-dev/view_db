export const SQLQuerys = {
	checkTableExists: `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = $1
    );`,

	getTableNames: `
    SELECT table_name AS "columnName"
    FROM information_schema.tables
    WHERE table_schema = 'public';`,

	getTableColumn: `
    SELECT column_name AS "columnName", data_type AS "dataType"
    FROM information_schema.columns
    WHERE table_name = $1;`,

	getColumns: "SELECT * FROM ${table:name} LIMIT 50;",

	checkTableEmpty:
		"SELECT count(*) FROM (SELECT 1 FROM ${table:name} LIMIT 1) AS t",
};
