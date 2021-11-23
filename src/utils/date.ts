export const dateDiffInHours = (dateEnd: Date, dateStart: Date) =>
  Math.round(Math.abs(dateEnd.getTime() - dateStart.getTime()) / 3600000)
