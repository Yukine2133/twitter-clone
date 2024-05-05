import { format } from "date-fns";

export const formatCreatedAt = (createdAt: Date) => {
  const currentDate = new Date();
  const tweetDate = new Date(createdAt);

  const differenceInMilliseconds = currentDate.getTime() - tweetDate.getTime();
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

  // Less than a minute ago
  if (differenceInSeconds < 60) {
    return `${differenceInSeconds}s`;
  }

  // Less than a day ago
  if (differenceInSeconds < 86400) {
    // Less than an hour ago
    if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes}m`;
    }

    // Less than a day ago
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours}h`;
  }

  // More than a day ago
  return format(tweetDate, "d MMM");
};

export const formatJoinedDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `Joined ${month} ${year}`;
};

export const formatDate = (createdAt: Date) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Date(createdAt).toLocaleString(
    "en-US",
    options as any
  );
  return formattedDate.replace(",", " ·");
};
