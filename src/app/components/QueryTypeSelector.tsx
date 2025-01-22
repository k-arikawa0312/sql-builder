"use client";
import { QueryType } from "../types/types";
interface Props {
  selectedType: QueryType;
  onSelect: (type: QueryType) => void;
}
export default function QueryTypeSelector({ selectedType, onSelect }: Props) {
  const queryTypes: { value: QueryType; label: string }[] = [
    { value: "SELECT", label: "検索" },
    { value: "INSERT", label: "追加" },
    { value: "UPDATE", label: "更新" },
    { value: "DELETE", label: "削除" },
    { value: "CREATE_TABLE", label: "テーブル作成" },
  ];
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Query Type
      </label>
      <div className="flex space-x-2">
        {queryTypes.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-4 py-2 rounded-md ${
              selectedType === value
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
