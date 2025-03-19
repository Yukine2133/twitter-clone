"use client";
import ReactTextareaAutosize from "react-textarea-autosize";
interface EditProfileFormInput {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  placeholder?: string;
  isTextarea?: boolean;
}

const EditProfileFormInput = ({
  label,
  value,
  onChange,
  maxLength,
  placeholder = "",
  isTextarea = false,
}: EditProfileFormInput) => {
  return (
    <div className="group relative rounded-md border border-neutral-800 px-3 py-2 focus-within:border-blue-500">
      <label className="block text-xs text-neutral-500">{label}</label>
      {isTextarea ? (
        <ReactTextareaAutosize
          value={value}
          onChange={(e) => onChange(e.target.value)}
          cols={3}
          maxLength={maxLength}
          placeholder={placeholder}
          className="mt-1 w-full resize-none bg-transparent text-base outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          className="mt-1 w-full bg-transparent text-base outline-none"
        />
      )}
      <span className="absolute right-3 top-3 text-xs text-neutral-500">
        {value.length}/{maxLength}
      </span>
    </div>
  );
};

export default EditProfileFormInput;
