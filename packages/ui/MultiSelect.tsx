"use client";
import Select, { ActionMeta, MultiValue } from "react-select";

export const MultiSelect = ({
  options,
  onChange,
  required,
}: {
  options: { value: string; label: string }[];
  onChange: (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void;
  required?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold" htmlFor="multiselect">
        Select Columns
      </label>
      <Select
        name="multiselect"
        isMulti
        options={options}
        onChange={onChange}
        required={required}
        closeMenuOnSelect={false}
      />
    </div>
  );
};
