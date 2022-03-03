export function parseTableHeader(string) {
  string = string.toLowerCase();
  string = string.replace("percentage", "%");
  return capitalizeFirstLetter(string);
}
export function numberToPercent(number, decimalPlaces = 1) {
  return number.toFixed(decimalPlaces) + "%";
}
export function parseTableData(string, stat) {
  stat = stat.toLowerCase();
  return stat.includes("percentage") ? numberToPercent(string) : string;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
