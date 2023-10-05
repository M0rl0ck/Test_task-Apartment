type Distance = {
  lunar: number;
  kilometers: number;
};

function getEnding(count: number): string {
  let num = count % 100;
  if (num > 10 && num < 20) {
    return "лунных орбит";
  }
  num = count % 10;
  switch (num) {
    case 0:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return "лунных орбит";
    case 1:
      return "лунная орбита";
    case 2:
    case 3:
    case 4:
      return "лунные орбиты";
    default:
      return "";
  }
}

const getDistance = (isLun: boolean, distance: Distance): string => {
  let res = isLun
    ? `${Math.ceil(distance.lunar)} ${getEnding(Math.ceil(distance.lunar))}`
    : `${Math.ceil(distance.kilometers).toLocaleString("ru")} км`;
  return res;
};

export { getDistance };
