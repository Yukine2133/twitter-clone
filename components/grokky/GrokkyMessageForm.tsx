import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

interface IGrokkyMessageFormProps {
  handleSendMessage: (e?: React.FormEvent) => void;
  input: string;
  setInput: (arg0: string) => void;
  isLoading: boolean;
  handleKeyDown: (arg0: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const GrokkyMessageForm = ({
  handleKeyDown,
  handleSendMessage,
  input,
  isLoading,
  setInput,
}: IGrokkyMessageFormProps) => {
  return (
    <div className="border-t border-neutral-800 p-4 bg-black">
      <form onSubmit={handleSendMessage} className="relative">
        <div className="flex items-center bg-neutral-800 rounded-2xl px-4 py-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Grok..."
            className="flex-grow bg-transparent outline-none resize-none max-h-32"
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`ml-2 p-2 rounded-full ${
              input.trim() && !isLoading
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-neutral-700 text-neutral-400"
            } transition-colors`}
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-2 text-center">
          Grokky may display inaccurate info, including about people, so
          double-check its responses.
        </p>
      </form>
    </div>
  );
};
