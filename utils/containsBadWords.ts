import { Filter } from "bad-words";
const filter = new Filter();

export const containsBadWords = (text: string): boolean => {
  return filter.isProfane(text);
};
