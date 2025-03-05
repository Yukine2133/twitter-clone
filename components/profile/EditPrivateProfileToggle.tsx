"use client";

interface PrivateProfileToggleProps {
  isPrivate: boolean;
  setIsPrivate: (isPrivate: boolean) => void;
}

const EditPrivateProfileToggle = ({
  isPrivate,
  setIsPrivate,
}: PrivateProfileToggleProps) => {
  return (
    <div className="flex items-center justify-between rounded-md border border-neutral-800 px-3 py-3">
      <span className="text-sm">Private profile</span>
      <button
        type="button"
        role="switch"
        aria-checked={isPrivate}
        onClick={() => setIsPrivate(!isPrivate)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          isPrivate ? "bg-blue-500" : "bg-neutral-700"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            isPrivate ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default EditPrivateProfileToggle;
