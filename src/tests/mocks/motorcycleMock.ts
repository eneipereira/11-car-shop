export const motorcycleMock = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const motorcycleMockWithId = {
  ...motorcycleMock,
  _id: "4edd40c86762e0fb12000003"
}

export const allMotorcyclesMock = [
  { ...motorcycleMockWithId }
]

export const toUpdateMotorcycleMock = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "black",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 125
}

export const toUpdateMotorcycleMockWithId = {
  ...toUpdateMotorcycleMock,
  _id: "4edd40c86762e0fb12000003"
}