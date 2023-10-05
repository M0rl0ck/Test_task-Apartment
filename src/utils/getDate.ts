function getDateString(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function getFormatDateString(dateString: string) {
  const date = new Date(dateString);
  const stringDate = date
    .toLocaleString("ru-RU", {
      day: "numeric",
      month: "short",
    })
    .replace(".", "");
  const stringYear = date.toLocaleString("ru-RU", {
    year: "numeric",
  });
  return `${stringDate} ${stringYear}`;
}

function getFormatFullDate(date: string): string {
  const newDate = new Date(date);
  return newDate.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function increaseDate(date: string, increment: number): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + increment);
  return getDateString(newDate);
}
export { getDateString, increaseDate, getFormatDateString, getFormatFullDate };
