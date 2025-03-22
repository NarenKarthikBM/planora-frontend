import dayjs from "dayjs";

export function convertPascalToNormal(text: string): string {
  return text.replace(/([A-Z])/g, " $1").trim();
}

export function convertNormalToPascal(text: string): string {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

export function formatToDateString(datetime: string): string {
  return dayjs(datetime).format("MMM D, YYYY h:mmA");
}
