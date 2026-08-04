import { useCallback, useRef, useState } from 'react';
import { FiUploadCloud, FiImage, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE_MB = 10;

export default function UploadBox({ previewUrl, onFileSelected, onClear, disabled }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateAndSet = useCallback(
    (file) => {
      if (!file) return;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error('Unsupported file type. Please upload a JPG, JPEG, or PNG image.');
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`Image is too large. Max size is ${MAX_SIZE_MB}MB.`);
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    validateAndSet(file);
  };

  if (previewUrl) {
    return (
      <div className="viewfinder relative rounded-xl2 overflow-hidden glass p-3">
        <div className="vf-tl" />
        <div className="vf-br" />
        <div className="relative rounded-xl overflow-hidden">
          <img src={previewUrl} alt="Selected leaf preview" className="w-full max-h-[420px] object-contain bg-canopy-50 dark:bg-canopy-800" />
          {!disabled && (
            <button
              onClick={onClear}
              aria-label="Remove image"
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-soil/70 text-white hover:bg-soil transition-colors"
            >
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) inputRef.current?.click();
      }}
      className={`flex flex-col items-center justify-center gap-4 rounded-xl2 border-2 border-dashed px-8 py-20 text-center cursor-pointer transition-colors duration-200 ${
        dragActive
          ? 'border-harvest bg-harvest-50 dark:bg-harvest-700/10'
          : 'border-canopy-200 dark:border-canopy-600 hover:border-canopy-400 bg-canopy-50/40 dark:bg-canopy-800/30'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={(e) => validateAndSet(e.target.files?.[0])}
        disabled={disabled}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-canopy-100 dark:bg-canopy-700 text-canopy-600 dark:text-harvest-300">
        <FiUploadCloud size={28} />
      </div>
      <div>
        <p className="font-display text-lg font-semibold text-canopy-700 dark:text-cream-100">
          Drag & drop a leaf photo here
        </p>
        <p className="mt-1 text-sm text-soil-light dark:text-cream-200/60">
          or click to browse — JPG, JPEG, or PNG, up to {MAX_SIZE_MB}MB
        </p>
      </div>
      <span className="inline-flex items-center gap-2 rounded-full border border-canopy-300 dark:border-canopy-500 px-4 py-2 text-sm font-medium text-canopy-700 dark:text-cream-100">
        <FiImage size={16} /> Browse Image
      </span>
    </div>
  );
}
