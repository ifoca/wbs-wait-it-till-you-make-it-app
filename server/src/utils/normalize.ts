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
