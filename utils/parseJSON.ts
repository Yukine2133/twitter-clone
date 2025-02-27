// Performs deep clone of serializable objects using JSON.parse(JSON.stringify())
// Only works for plain objects (no functions, Dates, Maps, Sets, etc.)
export const parseJSON = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
