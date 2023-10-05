export function getEnding(count: number): string {
  let num = count % 100;
  if (num > 10 && num < 20) {
    return "ов";
  }
  num = count % 10;
  switch (num) {
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return "ов";
    case 1:
      return "";
    case 2:
    case 3:
    case 4:
      return "а";
    default:
      return "";
  }
}
