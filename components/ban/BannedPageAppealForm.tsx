import { IBannedPageAppealFormProps } from "@/interfaces/props.interface";
import ReactTextareaAutosize from "react-textarea-autosize";

export const BannedPageAppealForm = ({
  handleSubmitAppeal,
  appealText,
  setAppealText,
}: IBannedPageAppealFormProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold mb-3">Appeal this suspension</h2>
      <p className="text-neutral-400 mb-4">
        If you believe this is a mistake, you can submit an appeal to have your
        account reviewed.
      </p>

      <form onSubmit={handleSubmitAppeal} className="space-y-4">
        <div>
          <label
            htmlFor="appeal"
            className="block text-sm text-neutral-400 mb-2"
          >
            Tell us why you think this suspension is incorrect:
          </label>
          <ReactTextareaAutosize
            id="appeal"
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            className="w-full bg-black border border-neutral-800 rounded-md p-3 min-h-[120px] focus:border-blue-500 focus:outline-none transition-colors resize-none"
            placeholder="Provide details about why you believe your account should be restored..."
          />
        </div>

        <button
          type="submit"
          disabled={!appealText.trim()}
          className="w-full py-3 rounded-full bg-blue-500 font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Submit Appeal
        </button>
      </form>
    </div>
  );
};
