"use client";
import { Table } from "../types/types";
interface Props {
  table: Table;
  selectedColumns: string[];
  onSelect: (columns: string[]) => void;
}
export default function ColumnSelector({
  table,
  selectedColumns,
  onSelect,
}: Props) {
  const handleColumnToggle = (columnName: string) => {
    if (selectedColumns.includes(columnName)) {
      onSelect(selectedColumns.filter((col) => col !== columnName));
    } else {
      onSelect([...selectedColumns, columnName]);
    }
  };
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        カラムを選択
      </label>
      <div className="space-y-2">
        {table.columns.map((column) => (
          <div key={column.name} className="flex items-center">
            <input
              type="checkbox"
              id={column.name}
              checked={selectedColumns.includes(column.name)}
              onChange={() => handleColumnToggle(column.name)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor={column.name}
              className="ml-2 block text-sm text-gray-900"
            >
              {column.name} ({column.type})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
