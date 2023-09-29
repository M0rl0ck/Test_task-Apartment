function getDateString(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

function getFormatDateString(date: Date) {
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

function increaseDate(date: string, increment: number): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return getDateString(newDate);
}
export { getDateString, increaseDate, getFormatDateString };
