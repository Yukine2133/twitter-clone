import Image from "next/image";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ClipboardDocumentIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
interface IGrokkyMessageCard {
  messageRole: string;
  messageContent: string;
}

export const GrokkyMessageCard = ({
  messageRole,
  messageContent,
}: IGrokkyMessageCard) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(messageContent);
    toast.success("Copied to clipboard");
  };
  return (
    <div
      className={`flex ${
        messageRole === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          messageRole === "user"
            ? "bg-blue-500 text-white"
            : "bg-neutral-800 text-white"
        }`}
      >
        {messageRole === "assistant" && (
          <div className="flex items-center gap-2 mb-2">
            <div className="relative h-6 w-6">
              <Image
                src="/grokky.png"
                alt="Grokky"
                width={24}
                height={18}
                className="rounded-full object-cover h-6 bg-blue-500"
              />
            </div>
            <span className="font-bold text-sm">Grok</span>
          </div>
        )}
        <ReactMarkdown>{messageContent}</ReactMarkdown>

        {messageRole === "assistant" && (
          <div className="flex items-center gap-2 mt-3 text-neutral-400">
            {/* Good response */}
            <Tooltip id="thumb-up-tooltip" content="Good Response" />
            <button
              data-tooltip-id="thumb-up-tooltip"
              className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
            >
              <HandThumbUpIcon className="h-4 w-4" />
            </button>
            {/* Bad Response */}
            <Tooltip id="thumb-down-tooltip" content="Bad Response" />
            <button
              data-tooltip-id="thumb-down-tooltip"
              className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
            >
              <HandThumbDownIcon className="h-4 w-4" />
            </button>
            {/* Copy to clipboard  */}
            <Tooltip id="clipboard-tooltip" content="Copy to clipboard" />
            <button
              data-tooltip-id="clipboard-tooltip"
              onClick={copyToClipboard}
              className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
            >
              <ClipboardDocumentIcon className="h-4 w-4" />
            </button>

            {/* More */}
            <Tooltip id="more-tooltip" content="More" />
            <button
              data-tooltip-id="more-tooltip"
              className="hover:text-white p-1 rounded-full hover:bg-neutral-700 transition-colors"
            >
              <EllipsisHorizontalIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
