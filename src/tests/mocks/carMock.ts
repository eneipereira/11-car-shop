export const carMock = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

export const carMockWithId = {
  ...carMock,
  _id: "4edd40c86762e0fb12000003",
}

export const allCarsMock = [
  { ...carMockWithId }
]

export const toUpdateCarMock = {
  model: "Fiat Uno",
  year: 1963,
  color: "blue",
  buyValue: 3500,
  seatsQty: 4,
  doorsQty: 4
}

export const toUpdateCarMockWithId = {
  ...toUpdateCarMock,
  _id: carMockWithId._id
}