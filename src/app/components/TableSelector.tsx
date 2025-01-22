// src/app/components/TableSelector.tsx
"use client";
import { Table } from "../types/types";
interface Props {
  tables: Table[];
  selectedTable: string;
  onSelect: (tableName: string) => void;
}
export default function TableSelector({
  tables,
  selectedTable,
  onSelect,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        テーブルを選択
      </label>
      <select
        value={selectedTable}
        onChange={(e) => onSelect(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-gray-600 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="">テーブルを選択してください...</option>
        {tables.map((table) => (
          <option key={table.name} value={table.name}>
            {table.name}
          </option>
        ))}
      </select>
    </div>
  );
}
