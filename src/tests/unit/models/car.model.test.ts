import * as sinon from 'sinon';
import chai from 'chai';
import { Model as CarDAO } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
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
});