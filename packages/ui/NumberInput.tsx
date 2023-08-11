export const NumberInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 10_000,
  step = 1,
  required,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-bold" htmlFor="number-input">
        {label}
      </label>
      <input
        name="number-input"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="border border-gray-300 rounded h-9 focus-visible:outline-blue-500 p-2"
        required={required}
      />
    </div>
  );
};
