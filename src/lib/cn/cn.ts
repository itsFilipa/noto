export const cn = (template: string) => {
  const trimmedClassnames = template.replace(/\s+/gmu, " ");
  return trimmedClassnames
    .split(" ")
    .filter(
      (className) =>
        className !== "false" &&
        className !== "true" &&
        className !== "undefined" &&
        className !== "null"
    )
    .join(" ")
    .trim();
};