import { SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const GrokkyLoadingCard = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-neutral-800 rounded-2xl p-4 max-w-[80%]">
        <div className="flex items-center gap-2 mb-2">
          <div className="relative h-6 w-6">
            <Image
              src="/grokky.png"
              alt="Grokky"
              width={24}
              height={18}
              className="rounded-full object-cover h-6 bg-blue-500"
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
              <SparklesIcon className="h-2 w-2 text-white" />
            </div>
          </div>
          <span className="font-bold text-sm">Grok</span>
        </div>
        <div className="flex mt-6 space-x-2">
          <div
            className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
          <div
            className="h-2 w-2 bg-neutral-400 rounded-full animate-bounce"
            style={{ animationDelay: "600ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
