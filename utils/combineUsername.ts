export function combineUsername(
  givenName: string | null,
  familyName: string | null
) {
  if (givenName && familyName) {
    return `${givenName}${familyName}`.replace(/\s/g, ""); // Concatenate and remove spaces
  } else {
    return (givenName || "").replace(/\s/g, ""); // If familyName is null, return only givenName
  }
}
