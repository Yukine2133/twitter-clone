import { ProfileLinkWrapper } from "@/components/tweets/ProfileLinkWrapper";

export const renderTweetTextWithHashtags = (text: string) => {
  return text.split(" ").map((part, index) => {
    if (part.startsWith("#")) {
      return (
        <ProfileLinkWrapper href={`/hashtag/${part.substring(1)}`} key={index}>
          <span className="text-blue-500">{part} </span>
        </ProfileLinkWrapper>
      );
    }
    return `${part} `;
  });
};
