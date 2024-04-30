import { formatDistanceToNow } from "date-fns";

export const formattedDate = (timestamp: Date) => {
  return new Date(timestamp).toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formattedTime = (timestamp: Date) => {
  return new Date(timestamp).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatCreatedAt = (createdAt: Date) => {
  const currentDate = new Date();
  const tweetDate = new Date(createdAt);

  const differenceInMilliseconds = currentDate.getTime() - tweetDate.getTime();
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

  // Less than an hour ago
  if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes}m`;
  }

  // Less than a day ago
  if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours}h`;
  }

  // More than a day ago
  return formatDistanceToNow(tweetDate, { addSuffix: true });
};
