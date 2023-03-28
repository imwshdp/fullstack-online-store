export const parseDate = (date: string) => {
  const parsedData = Date.parse(date)
  const formattedDate = new Date(parsedData).toLocaleDateString('ru-RU')
  return formattedDate
}