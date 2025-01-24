"use client";
import { useState } from "react";
import QueryTypeSelector from "./QueryTypeSelector";
import TableSelector from "./TableSelector";
import ColumnSelector from "./ColumnSelector";
import ConditionBuilder from "./ConditionBuilder";
import InsertBuilder from "./InsertBuilder";
import CreateTableBuilder from "./CreateTableBuilder";
import SqlPreview from "./SqlPreview";
import UpdateBuilder from "./UpdateBuilder";
import { ColumnWithCount, QueryConfig, QueryType } from "../types/types";

const SAMPLE_TABLES = [
  {
    name: "users",
    columns: [
      { name: "id", type: "INTEGER" },
      { name: "name", type: "TEXT" },
      { name: "email", type: "TEXT" },
    ],
  },
  {
    name: "products",
    columns: [
      { name: "id", type: "INTEGER" },
      { name: "name", type: "TEXT" },
      { name: "price", type: "DECIMAL" },
    ],
  },
];

const INITIAL_STATE: QueryConfig = {
  queryType: "SELECT",
  selectedTable: "",
  selectedColumns: [],
  conditions: [],
  insertValues: [],
  updateValues: [],
  createTableColumns: [],
};

export default function QueryBuilder() {
  const [queryConfig, setQueryConfig] = useState<QueryConfig>(INITIAL_STATE);
  const [isCountData, setIsCountData] = useState<boolean>(true);

  const handleQueryTypeChange = (queryType: QueryType) => {
    console.log(isCountData)
    setQueryConfig({ ...INITIAL_STATE, queryType, isCountData });
  };
  
  const handleCountChange = (count: boolean) => {
    setQueryConfig((prev) => ({ ...prev, countData: count }));
  };

  const handleColumnSelect = (columns: ColumnWithCount[]) => {
    setQueryConfig((prev) => ({ ...prev, selectedColumns: columns }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        SQLクエリビルダー
      </h1>
      <div className="space-y-6">
        <QueryTypeSelector
          selectedType={queryConfig.queryType}
          onSelect={handleQueryTypeChange}
        />
        {queryConfig.queryType !== "CREATE_TABLE" && (
          <TableSelector
            tables={SAMPLE_TABLES}
            selectedTable={queryConfig.selectedTable}
            onSelect={(tableName) =>
              setQueryConfig((prev) => ({ ...prev, selectedTable: tableName }))
            }
          />
        )}
        {queryConfig.selectedTable && (
          <>
            {queryConfig.queryType === "SELECT" && (
              <>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isCountData}
                    onChange={(event) => handleCountChange(event.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">カウントを取得</label>
                </div>
                <ColumnSelector
                  table={
                    SAMPLE_TABLES.find(
                      (t) => t.name === queryConfig.selectedTable
                    )!
                  }
                  selectedColumns={queryConfig.selectedColumns}
                  onSelect={handleColumnSelect}
                />
                <ConditionBuilder
                  table={
                    SAMPLE_TABLES.find(
                      (t) => t.name === queryConfig.selectedTable
                    )!
                  }
                  conditions={queryConfig.conditions}
                  onChange={(conditions) =>
                    setQueryConfig((prev) => ({ ...prev, conditions }))
                  }
                />
              </>
            )}
            {queryConfig.queryType === "INSERT" && (
              <InsertBuilder
                table={
                  SAMPLE_TABLES.find(
                    (t) => t.name === queryConfig.selectedTable
                  )!
                }
                values={queryConfig.insertValues}
                onChange={(insertValues) =>
                  setQueryConfig((prev) => ({ ...prev, insertValues }))
                }
              />
            )}
            {queryConfig.queryType === "UPDATE" && (
              <>
                <UpdateBuilder
                  table={
                    SAMPLE_TABLES.find(
                      (t) => t.name === queryConfig.selectedTable
                    )!
                  }
                  values={queryConfig.updateValues}
                  onChange={(
                    updateValues: Array<{ column: string; value: string }>
                  ) => setQueryConfig((prev) => ({ ...prev, updateValues }))}
                />
                <ConditionBuilder
                  table={
                    SAMPLE_TABLES.find(
                      (t) => t.name === queryConfig.selectedTable
                    )!
                  }
                  conditions={queryConfig.conditions}
                  onChange={(conditions) =>
                    setQueryConfig((prev) => ({ ...prev, conditions }))
                  }
                />
              </>
            )}
            {queryConfig.queryType === "DELETE" && (
              <ConditionBuilder
                table={
                  SAMPLE_TABLES.find(
                    (t) => t.name === queryConfig.selectedTable
                  )!
                }
                conditions={queryConfig.conditions}
                onChange={(conditions) =>
                  setQueryConfig((prev) => ({ ...prev, conditions }))
                }
              />
            )}
          </>
        )}
        {queryConfig.queryType === "CREATE_TABLE" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                テーブル名
              </label>
              <input
                type="text"
                value={queryConfig.selectedTable}
                onChange={(e) =>
                  setQueryConfig((prev) => ({
                    ...prev,
                    selectedTable: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded-md text-gray-600 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="新しいテーブル名を入力"
              />
            </div>
            <CreateTableBuilder
              columns={queryConfig.createTableColumns}
              onChange={(createTableColumns) =>
                setQueryConfig((prev) => ({ ...prev, createTableColumns }))
              }
            />
          </>
        )}
        <SqlPreview queryConfig={queryConfig} />
      </div>
    </div>
  );
}
