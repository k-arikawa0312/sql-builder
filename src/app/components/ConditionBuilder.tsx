"use client";
import { Table, Condition } from "../types/types";
interface Props {
  table: Table;
  conditions: Condition[];
  onChange: (conditions: Condition[]) => void;
}
export default function ConditionBuilder({
  table,
  conditions,
  onChange,
}: Props) {
  const addCondition = () => {
    onChange([...conditions, { column: "", operator: "=", value: "" }]);
  };
  const removeCondition = (index: number) => {
    onChange(conditions.filter((_, i) => i !== index));
  };
  const updateCondition = (
    index: number,
    field: keyof Condition,
    value: string
  ) => {
    const newConditions = conditions.map((condition, i) => {
      if (i === index) {
        return { ...condition, [field]: value };
      }
      return condition;
    });
    onChange(newConditions);
  };
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        検索条件
      </label>
      {conditions.map((condition, index) => (
        <div key={index} className="flex space-x-2 items-center">
          <select
            value={condition.column}
            onChange={(e) => updateCondition(index, "column", e.target.value)}
            className="block w-1/3 text-gray-600 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Select column...</option>
            {table.columns.map((column) => (
              <option key={column.name} value={column.name}>
                {column.name}
              </option>
            ))}
          </select>
          <select
            value={condition.operator}
            onChange={(e) => updateCondition(index, "operator", e.target.value)}
            className="block w-1/4 text-gray-600 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="=">=</option>
            <option value="!=">!=</option>
            <option value=">">{">"}</option>
            <option value=">=">{">="}</option>
            <option value="<">{"<"}</option>
            <option value="<=">{"<="}</option>
            <option value="LIKE">LIKE</option>
          </select>
          <input
            type="text"
            value={condition.value}
            onChange={(e) => updateCondition(index, "value", e.target.value)}
            className="block w-1/3 text-gray-600 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Value"
          />
          <button
            onClick={() => removeCondition(index)}
            className="text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addCondition}
        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        条件を追加
      </button>
    </div>
  );
}
