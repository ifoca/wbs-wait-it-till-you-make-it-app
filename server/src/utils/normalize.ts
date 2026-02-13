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
export const capitalizeCity = (text: string): string => {
  // Split by spaces and hyphens, capitalize each part
  return text
    .split(/(\s|-)/g)
    .map((part) => {
      if (part === ' ' || part === '-') return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join('');
};

// TO DO: save the name without umlauts as aliasNames
