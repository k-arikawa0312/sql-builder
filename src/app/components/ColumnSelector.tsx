"use client";
import { Table } from "../types/types";

interface ColumnWithCount {
  name: string;
  count: boolean;
}

interface Props {
  table: Table;
  selectedColumns: ColumnWithCount[];
  onSelect: (columns: ColumnWithCount[]) => void;
}

export default function ColumnSelector({
  table,
  selectedColumns,
  onSelect,
}: Props) {
  const handleColumnToggle = (columnName: string) => {
    const updatedColumns = selectedColumns.some(col => col.name === columnName)
      ? selectedColumns.filter(col => col.name !== columnName)
      : [...selectedColumns, { name: columnName, count: false }];

    onSelect(updatedColumns);
  };

  const handleCountToggle = (columnName: string) => {
    const updatedColumns = selectedColumns.map(col => {
      if (col.name === columnName) {
        return { ...col, count: !col.count };
      }
      return col;
    });

    onSelect(updatedColumns);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        カラムを選択
      </label>
      <div className="space-y-2">
        {table.columns.map((column) => {
          const selectedColumn = selectedColumns.find(col => col.name === column.name);
          return (
            <div key={column.name} className="flex items-center">
              <input
                type="checkbox"
                id={column.name}
                checked={!!selectedColumn}
                onChange={() => handleColumnToggle(column.name)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor={column.name}
                className="ml-2 block text-sm text-gray-900"
              >
                {column.name} ({column.type})
              </label>
              <input
                type="checkbox"
                checked={selectedColumn?.count || false}
                onChange={() => handleCountToggle(column.name)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ml-4"
              />
              <label className="ml-2 block text-sm text-gray-900">カウントを取得</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
