"use client";

import { useRef, useState } from "react";

export type ProductImageItem = {
  id?: number;
  file?: File;
  url: string;
};

interface ImagesUploadProps {
  images: ProductImageItem[];
  onChange: (images: ProductImageItem[]) => void;
}

export function MerchantProductImageInput({
  images,
  onChange,
}: ImagesUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return;

    const accepted = Array.from(newFiles).filter((f) =>
      f.type.startsWith("image/"),
    );

    const uploaded = accepted.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const nextImages = [...images, ...uploaded];
    onChange(nextImages);
  }

  function removeImage(index: number) {
    const image = images[index];

    // If it's a new upload, revoke the local object URL to free memory
    if (!image.id && image.url) {
      URL.revokeObjectURL(image.url);
    }

    const next = images.filter((_, i) => i !== index);
    onChange(next);
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
                           transition-opacity duration-150 leading-none cursor-pointer"
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
