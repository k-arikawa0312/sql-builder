export interface Column {
  name: string;
  type: string;
  nullable?: boolean;
  primaryKey?: boolean;
}

export interface Table {
  name: string;
  columns: Column[];
}

export interface Condition {
  column: string;
  operator: string;
  value: string;
}

export interface InsertValue {
  column: string;
  value: string;
}

export interface UpdateValue {
  column: string;
  value: string;
}

export interface CreateTableColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  isForeignKey: boolean;
  referenceTable?: string;
  referenceColumn?: string;
}

export interface ColumnWithCount {
  name: string;
  count: boolean;
}

export type CustomType = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
export type QueryType = CustomType | "CREATE_TABLE" | "CUSTOM";

export interface QueryConfig {
  queryType: QueryType;
  selectedTable: string;
  selectedColumns: ColumnWithCount[];
  conditions: Condition[];
  insertValues: InsertValue[];
  updateValues: UpdateValue[];
  createTableColumns: CreateTableColumn[];
  isCountData?: boolean;
}

export interface CustomConfig {
  name: string;
  column: string;
  query: CustomType;
}