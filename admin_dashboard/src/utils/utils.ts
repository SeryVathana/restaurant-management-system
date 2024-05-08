export const toCapitalize = (text: string) => {
  return text.split("")[0].toUpperCase() + text.slice(1).toLowerCase();
};
