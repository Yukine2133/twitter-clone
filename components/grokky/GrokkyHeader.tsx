import { ArrowPathIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export const GrokkyHeader = () => {
  return (
    <header className="border-b border-neutral-800 p-4 flex items-center justify-between bg-black sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8">
          <Image
            src="/grokky.png"
            alt="Grokky"
            width={32}
            height={32}
            className="rounded-full bg-blue-500"
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
            <SparklesIcon className="h-3 w-3 text-white" />
          </div>
        </div>
        <h1 className="font-bold text-xl">Grokky</h1>
      </div>
      <button className="text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors">
        <ArrowPathIcon className="h-5 w-5" />
      </button>
    </header>
  );
};
