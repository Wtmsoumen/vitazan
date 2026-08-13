"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, ImageIcon } from "lucide-react";

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

export default function ImageUpload({ label = "Upload Image", value, onChange, className = "" }: ImageUploadProps) {
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [hasLocalFile, setHasLocalFile] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = hasLocalFile ? localPreview : (value || null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (localPreview?.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    setHasLocalFile(true);
    onChange?.(file);
  };

  useEffect(() => {
    return () => {
      if (localPreview?.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const removeImage = () => {
    if (localPreview?.startsWith("blob:")) URL.revokeObjectURL(localPreview);
    setLocalPreview(null);
    setHasLocalFile(false);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>}
      {preview ? (
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="relative block h-32 w-32 overflow-hidden rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal/40"
            aria-label="Change image"
          >
            <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
          </button>
          <button
            type="button"
            onClick={removeImage}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm hover:bg-red-600"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors ${dragActive ? "border-[#00485d] bg-[#00485d]/5" : "border-gray-200 bg-gray-50 hover:border-gray-300"
            }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
            <ImageIcon size={22} className="text-black" />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-700">Click to upload or drag & drop</p>
          <p className="mt-1 text-xs text-black">PNG, JPG, WEBP up to 5MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
    </div>
  );
}
