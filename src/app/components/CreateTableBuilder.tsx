"use client";
import { CreateTableColumn } from "../types/types";
interface Props {
  columns: CreateTableColumn[];
  onChange: (columns: CreateTableColumn[]) => void;
}
export default function CreateTableBuilder({ columns, onChange }: Props) {
  const addColumn = () => {
    onChange([
      ...columns,
      {
        name: "",
        type: "VARCHAR(255)",
        nullable: true,
        primaryKey: false,
        isForeignKey: false,
        referenceTable: "",
        referenceColumn: "",
      },
    ]);
  };
  const removeColumn = (index: number) => {
    onChange(columns.filter((_, i) => i !== index));
  };
  const updateColumn = (
    index: number,
    field: keyof CreateTableColumn,
    value: string | boolean
  ) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return { ...column, [field]: value };
      }
      return column;
    });
    onChange(newColumns);
  };
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        テーブルのカラム
      </label>
      {columns.map((column, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <input
            type="text"
            value={column.name}
            onChange={(e) => updateColumn(index, "name", e.target.value)}
            className="block w-1/4 rounded-md text-gray-600 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="カラム名"
          />
          <select
            value={column.type}
            onChange={(e) => updateColumn(index, "type", e.target.value)}
            className="block w-1/4 rounded-md text-gray-600 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="VARCHAR(255)">文字列(VARCHAR)</option>
            <option value="INTEGER">整数</option>
            <option value="DECIMAL">小数</option>
            <option value="DATETIME">日時</option>
            <option value="BOOLEAN">真偽値</option>
          </select>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={column.nullable}
              onChange={(e) =>
                updateColumn(index, "nullable", e.target.checked)
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">NULL許可</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={column.primaryKey}
              onChange={(e) =>
                updateColumn(index, "primaryKey", e.target.checked)
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">主キー</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={column.isForeignKey}
              onChange={(e) =>
                updateColumn(index, "isForeignKey", e.target.checked)
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">外部キー</span>
          </label>
          {column.isForeignKey && (
            <>
              <input
                type="text"
                value={column.referenceTable || ""}
                onChange={(e) =>
                  updateColumn(index, "referenceTable", e.target.value)
                }
                className="block w-1/4 rounded-md text-gray-600 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="参照テーブル"
              />
              <input
                type="text"
                value={column.referenceColumn || ""}
                onChange={(e) =>
                  updateColumn(index, "referenceColumn", e.target.value)
                }
                className="block w-1/4 rounded-md text-gray-600 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="参照カラム"
              />
            </>
          )}
          <button
            onClick={() => removeColumn(index)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            削除
          </button>
        </div>
      ))}
      <button
        onClick={addColumn}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        カラムを追加
      </button>
    </div>
  );
}
