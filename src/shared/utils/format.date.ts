export function formatDate(date: string): string {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export function formatDateByDayMonthYearHoursMinutes(date: string): string {
  const dateObject = new Date(date);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = dateObject.toLocaleString("en-US", { month: "long" }); // "June"
  const year = dateObject.getFullYear();

  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}
