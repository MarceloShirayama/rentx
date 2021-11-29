export type RequestRentalDTO = {
  user_id: string
  car_id: string
  expect_return_date: Date
}

export type DevolutionCarDTO = {
  rental_id: string
  user_id: string
}
