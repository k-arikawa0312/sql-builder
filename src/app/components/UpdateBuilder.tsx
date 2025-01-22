"use client";
import { Table, UpdateValue } from "../types/types";

interface Props {
  table: Table;
  values: UpdateValue[];
  onChange: (values: UpdateValue[]) => void;
}

export default function UpdateBuilder({ table, values, onChange }: Props) {
  const addValue = () => {
    onChange([...values, { column: "", value: "" }]);
  };

  const removeValue = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const updateValue = (
    index: number,
    field: keyof UpdateValue,
    value: string
  ) => {
    onChange(
      values.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Update Values
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <select
            value={value.column}
            onChange={(e) => updateValue(index, "column", e.target.value)}
            className="block w-1/3 text-gray-600 rounded-md border-gray-300"
          >
            <option value="">Select column...</option>
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
            className="block w-1/3 text-gray-600 rounded-md border-gray-300"
            placeholder="Value"
          />
          <button
            onClick={() => removeValue(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addValue}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Add Value
      </button>
    </div>
  );
}
