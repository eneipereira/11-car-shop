import * as sinon from 'sinon';
import chai from 'chai';
import { Model as CarDAO } from 'mongoose';
import { allCarsMock, carMock, carMockWithId } from '../../mocks/carMock';
import CarModel from '../../../models/Car.model';
const { expect } = chai;

describe('src/models/car.model', () => {
  const carModel = new CarModel();

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created item', async () => {
      sinon.stub(CarDAO, 'create').resolves(carMockWithId)
      const newCar = await carModel.create(carMock)

      expect(newCar).to.deep.eq(carMockWithId)
    });
  })

  describe('read', () => {
    it('should return an array with all itens', async () => {
      sinon.stub(CarDAO, 'find').resolves(allCarsMock)

      const cars = await carModel.read()

      expect(cars[0]).to.deep.eq(allCarsMock[0])
    })

    it('should return an empty array if there aren\'t itens', async () => {
      sinon.stub(CarDAO, 'find').resolves([])

      const cars = await carModel.read()

      expect(cars).to.deep.eq([])
    })
  })
});