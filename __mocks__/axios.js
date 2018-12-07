export default {
  getCongressPeople: jest.fn(() => Promise.resolve({ data: {} })),
  getCongressPerson: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} }))
}