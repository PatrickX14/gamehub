"use client";

import { ChangeEventHandler, useRef, useState } from "react";

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
  defaultValue?: string | number;
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
        defaultValue={defaultValue ? defaultValue : undefined}
        onChange={onChange}
      />
    </InputBase>
  );
}

interface EmailInputProps extends Omit<InputBaseProps, "children"> {
  defaultValue?: string;
  required?: boolean;
}

export function EmailInput({ label, required, defaultValue }: EmailInputProps) {
  return (
    <InputBase label={label}>
      <input
        className="border border-[#364049]/20 rounded-md w-full overflow-hidden py-1 px-2 text-primary"
        required={required}
        name={"email"}
        defaultValue={defaultValue ? defaultValue : undefined}
        type="email"
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

interface ImagesUploadProps {
  onChange?: (files: File[]) => void;
}

export function ImagesUpload({ onChange }: ImagesUploadProps) {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;
    // Checks if file is image
    const accepted = Array.from(newFiles).filter((f) =>
      f.type.startsWith("image/"),
    );
    const withUrl = accepted.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => {
      const merged = [...prev, ...withUrl];
      onChange?.(merged.map((i) => i.file));
      return merged;
    });
  }

  function removeImage(index: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      const next = prev.filter((_, i) => i !== index);
      onChange?.(next.map((i) => i.file));
      return next;
    });
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <label className="text-sm mb-0.5 text-secondary">Product Images</label>
      <div className="flex items-start gap-3 flex-wrap">
        {/* Uploaded thumbnails */}
        {images.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {images.map(({ url }, i) => (
              <div
                key={url}
                className="relative group w-44 h-30 rounded-xl overflow-hidden border border-[#364049]/15 shadow-sm flex-shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`upload-${i}`}
                  className="w-full h-full object-cover"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white text-xs
                           flex items-center justify-center opacity-0 group-hover:opacity-100
                           transition-opacity duration-150 leading-none"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            "flex flex-col items-center justify-center gap-2 w-44 h-30 rounded-xl",
            "border-2 border-dashed transition-colors duration-150 cursor-pointer select-none px-3",
            isDragging
              ? "border-[#FACC14] bg-[#FACC14]/10"
              : "border-[#364049]/25 bg-gray-50 hover:border-[#364049]/50 hover:bg-gray-100",
          ].join(" ")}
          aria-label="Upload images"
        >
          {/* Upload icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0-12l-3.5 3.5M12 4l3.5 3.5"
            />
          </svg>
          <p className="text-[11px] text-gray-400 text-center leading-snug">
            Drop your image here, or{" "}
            <span className="text-gray-600 font-medium">browse</span>
            <br />
            <span className="text-[10px]">JPG, PNG, GIF (Max 5MB)</span>
          </p>
        </button>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
