"use client";
import { Table, InsertValue } from "../types/types";
interface Props {
  table: Table;
  values: InsertValue[];
  onChange: (values: InsertValue[]) => void;
}
export default function InsertBuilder({ table, values, onChange }: Props) {
  const addValue = () => {
    onChange([...values, { column: "", value: "" }]);
  };
  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };
  const updateValue = (
    index: number,
    field: keyof InsertValue,
    value: string
  ) => {
    const newValues = values.map((v, i) => {
      if (i === index) {
        return { ...v, [field]: value };
      }
      return v;
    });
    onChange(newValues);
  };
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        追加する値
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <select
            value={value.column}
            onChange={(e) => updateValue(index, "column", e.target.value)}
            className="block w-1/3 text-gray-600 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">カラムを選択...</option>
            {table.columns.map((column) => (
              <option key={column.name} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={value.value}
            onChange={(e) => updateValue(index, "value", e.target.value)}
            className="block w-1/3 text-gray-600 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="値を入力"
          />
          <button
            onClick={() => removeValue(index)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            削除
          </button>
        </div>
      ))}
      <button
        onClick={addValue}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        値を追加
      </button>
    </div>
  );
}
