const round = (number: number) => Math.round(number)
const absNumber = (number: number) => Math.abs(number)

export const dateDiffInHours = (dateEnd: Date, dateStart: Date) => {
  const inicialDate = new Date(dateStart).getTime()
  const finalDate = new Date(dateEnd).getTime()

  const diffHours = round(absNumber(finalDate - inicialDate) / 3600000)

  return diffHours
}
// Math.round(Math.abs(dateEnd.getTime() - dateStart.getTime()) / 3600000)
