// Ensure the hash is always non-negative
export const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

// Function to pick a color based on the hash value
export const getColorFromHash = (hash: number) => {
  const colors = [
    "bg-purple-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-blue-500",
  ];
  return colors[hash % colors.length];
};
