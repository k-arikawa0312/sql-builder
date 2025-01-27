"use client";
import { QueryConfig } from "../types/types";
import { ReactElement } from "react";

interface Props {
  queryConfig: QueryConfig;
}

export default function SqlPreview({ queryConfig }: Props): ReactElement {
  const generateSql = () => {
    switch (queryConfig.queryType) {
      case "SELECT":
        return generateSelectSql();
      case "INSERT":
        return generateInsertSql();
      case "UPDATE":
        return generateUpdateSql();
      case "DELETE":
        return generateDeleteSql();
      case "CREATE_TABLE":
        return generateCreateTableSql();
      default:
        return "";
    }
  };

  const generateSelectSql = () => {
    if (!queryConfig.selectedTable) return "";

    let columns: string;
    const groupByColumns: string[] = [];

    if (queryConfig.selectedColumns.some(col => col.count)) {
      columns = queryConfig.selectedColumns
        .map(col => {
          if (col.count) {
            return `COUNT(${col.name})`;
          } else {
            groupByColumns.push(col.name);
            return col.name;
          }
        })
        .join(", ");
    } else if (queryConfig.selectedColumns.length > 0) {
      columns = queryConfig.selectedColumns.map(col => col.name).join(", ");
    } else {
      columns = "*";
    }

    let sql = `SELECT ${columns}\nFROM ${queryConfig.selectedTable}`;
    
    if (queryConfig.conditions.length > 0) {
      const whereClause = queryConfig.conditions
        .filter((c) => c.column && c.operator && c.value)
        .map((c) => `${c.column} ${c.operator} '${c.value}'`)
        .join("\n  AND ");
      if (whereClause) {
        sql += "\nWHERE " + whereClause;
      }
    }

    if (groupByColumns.length > 0) {
      sql += `\nGROUP BY ${groupByColumns.join(", ")}`;
    }

    if (queryConfig.selectedColumns.some(col => col.count)) {
      sql += `\nHAVING COUNT(*) > 0`;
    }
    
    return sql + ";";
  };

  const generateInsertSql = () => {
    if (!queryConfig.selectedTable || queryConfig.insertValues.length === 0)
      return "";
    const columns = queryConfig.insertValues.map((v) => v.column).join(", ");
    const values = queryConfig.insertValues
      .map((v) => `'${v.value}'`)
      .join(", ");
    return `INSERT INTO ${queryConfig.selectedTable} (${columns})\nVALUES (${values});`;
  };

  const generateUpdateSql = () => {
    if (!queryConfig.selectedTable || queryConfig.updateValues.length === 0)
      return "";
    const updates = queryConfig.updateValues
      .map((v) => `${v.column} = '${v.value}'`)
      .join(",\n  ");
    let sql = `UPDATE ${queryConfig.selectedTable}\nSET\n  ${updates}`;

    if (queryConfig.conditions.length > 0) {
      const whereClause = queryConfig.conditions
        .filter((c) => c.column && c.operator && c.value)
        .map((c) => `${c.column} ${c.operator} '${c.value}'`)
        .join("\n  AND ");
      if (whereClause) {
        sql += "\nWHERE " + whereClause;
      }
    }
    return sql + ";";
  };

  const generateDeleteSql = () => {
    if (!queryConfig.selectedTable) return "";
    let sql = `DELETE FROM ${queryConfig.selectedTable}`;
    if (queryConfig.conditions.length > 0) {
      const whereClause = queryConfig.conditions
        .filter((c) => c.column && c.operator && c.value)
        .map((c) => `${c.column} ${c.operator} '${c.value}'`)
        .join("\n  AND ");
      if (whereClause) {
        sql += "\nWHERE " + whereClause;
      }
    }
    return sql + ";";
  };

  const generateCreateTableSql = () => {
    console.log(
      "Selected Table:",
      queryConfig.selectedTable,
      typeof queryConfig.selectedTable
    );
    console.log("Create Table Columns:", queryConfig.createTableColumns);

    if (!queryConfig.selectedTable) {
      console.log("No table name provided");
      return "";
    }

    if (queryConfig.createTableColumns.length === 0) {
      console.log("No columns defined");
      return "";
    }

    const columns = queryConfig.createTableColumns
      .map((column) => {
        let def = `${column.name} ${column.type}`;
        if (column.primaryKey) def += " PRIMARY KEY";
        if (!column.nullable) def += " NOT NULL";
        return def;
      })
      .join(",\n  ");

    // 外部キー制約を別途定義
    const foreignKeys = queryConfig.createTableColumns
      .filter(
        (column) =>
          column.isForeignKey && column.referenceTable && column.referenceColumn
      )
      .map(
        (column) =>
          `  FOREIGN KEY (${column.name}) REFERENCES ${column.referenceTable}(${column.referenceColumn})`
      )
      .join(",\n");

    const sql = `CREATE TABLE ${queryConfig.selectedTable} (\n  ${columns}${
      foreignKeys ? ",\n" + foreignKeys : ""
    }\n);`;
    console.log("Generated SQL:", sql);
    return sql;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        生成されたSQL
      </label>
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto border border-gray-200">
        <code className="text-sm text-gray-800">{generateSql()}</code>
      </pre>
    </div>
  );
}
