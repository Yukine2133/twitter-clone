import Link from "next/link";

export const renderTweetTextWithHashtags = (text: string) => {
  return text.split(" ").map((part, index) => {
    if (part.startsWith("#")) {
      return (
        <Link href={`/hashtag/${part.substring(1)}`} key={index}>
          <span className="text-blue-500">{part} </span>
        </Link>
      );
    }
    return `${part} `;
  });
};
