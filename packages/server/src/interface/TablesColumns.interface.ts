export interface TableColumns {
	columnName: string;
	columnType: string;
}

export type P = Pick<TableColumns, "columnType">;
