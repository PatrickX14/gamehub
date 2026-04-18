"use client";

import { ChangeEventHandler, useState } from "react";

interface InputBaseProps {
  label: string;
  children: React.ReactNode;
}

function InputBase({ label, children }: InputBaseProps) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-0.5 text-secondary">{label}</label>
      {children}
    </div>
  );
}

interface TextInputProps extends Omit<InputBaseProps, "children"> {
  name: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function TextInput({
  label,
  name,
  required,
  defaultValue,
  onChange,
}: TextInputProps) {
  return (
    <InputBase label={label}>
      <input
        className="border border-[#364049]/20 rounded-md w-full overflow-hidden py-1 px-2 text-primary"
        required={required}
        name={name}
        defaultValue={defaultValue ? defaultValue : ""}
        onChange={onChange}
      />
    </InputBase>
  );
}

interface SelectProps extends Omit<InputBaseProps, "children"> {
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function Select({ label, options, onChange }: SelectProps) {
  return (
    <InputBase label={label}>
      <select
        name="status"
        onChange={onChange}
        className="border border-[#364049]/20 rounded-md w-full overflow-hidden py-1 px-2 text-primary"
      >
        {options.map((s, index: number) => (
          <option key={s} value={index === 0 ? "" : s}>
            {s}
          </option>
        ))}
      </select>
    </InputBase>
  );
}

interface DateInputProps extends Omit<InputBaseProps, "children"> {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function DateInput({ label, onChange }: DateInputProps) {
  return (
    <InputBase label={label}>
      <input
        type="date"
        onChange={onChange}
        className="border border-[#364049]/20 rounded-md w-full overflow-hidden py-1 px-2 text-primary"
      />
    </InputBase>
  );
}

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  defaultChecked?: boolean;
  onChange: (isChecked: boolean) => void;
}

export function Toggle({
  label,
  description,
  defaultChecked = false,
}: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div
      className="flex items-center justify-between gap-6 cursor-pointer select-none"
      onClick={() => setChecked((v) => !v)}
    >
      <div className="flex flex-col">
        <span className="text-[15px] font-semibold text-gray-800">{label}</span>
        {description && (
          <span className="text-[13px] text-gray-400 mt-0.5">
            {description}
          </span>
        )}
      </div>

      {/* Track */}
      <div
        className="relative flex-shrink-0 w-12 h-6 rounded-full transition-colors duration-200"
        style={{ backgroundColor: checked ? "#FACC14" : "#D9D9D9" }}
      >
        {/* Dot */}
        <div
          className="absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full transition-transform duration-200"
          style={{
            backgroundColor: "#EEF2F6",
            transform: checked ? "translateX(24px)" : "translateX(0)",
          }}
        />
      </div>
    </div>
  );
}
