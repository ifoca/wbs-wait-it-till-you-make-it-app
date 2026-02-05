export const normalizeGermanText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .trim();
};

/*
Examples:
    normalizeGermanText("Düsseldorf")  -> "duesseldorf"
    normalizeGermanText("München")     -> "muenchen"
    normalizeGermanText("Köln")        -> "koeln"
*/

// Standardize the text format
// Capitalizes the first char and Lowercases all the chars starting with index 1
export const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  // To do: to handle multi-words text: Berliner Allee becomes Berliner allee now
};
