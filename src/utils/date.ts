// const round = (number: number) => Math.round(number)
const ceil = (number: number) => Math.ceil(number)

export const dateDiffInHours = (dateEnd: Date, dateStart: Date) => {
  const inicialDate = new Date(dateStart).getTime()
  const finalDate = new Date(dateEnd).getTime()

  const diffHours = ceil((finalDate - inicialDate) / 3600000)

  return diffHours
}

export const dateDiffInDays = (dateEnd: Date, dateStart: Date) => {
  const diffDays = ceil(dateDiffInHours(dateEnd, dateStart) / 24)

  return diffDays
}

export const addHoursInCurrentDate = (hours: number) =>
  new Date(new Date().setHours(new Date().getHours() + hours))

export const subHoursInCurrentDate = (hours: number) =>
  new Date(new Date().setHours(new Date().getHours() - hours))
