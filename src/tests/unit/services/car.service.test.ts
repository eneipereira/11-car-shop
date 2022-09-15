import * as sinon from 'sinon';
import chai, { use } from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { carMock, carMockWithId } from '../../mocks/carMock';
import chaiAsPromised from 'chai-as-promised';
import { SafeParseError, SafeParseReturnType, ZodError } from 'zod';
import { Car, ICar } from '../../../interfaces/ICar';
const { expect } = chai;

use(chaiAsPromised)

describe('src/services/car.service', () => {
  const carModel = new CarModel
  const carService = new CarService(carModel)

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created item', async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId)
      const newCar = await carService.create(carMock)
      
      expect(newCar).to.deep.eq(carMockWithId)
    });
    
    it('should rejects with ZodError if an invalid argument is passed', async () => {
      sinon.stub(Car, 'safeParse').returns({ success: false, error: new ZodError([]) } as SafeParseError<ICar>)

      return expect(carService.create({})).to.be.eventually.rejectedWith(ZodError)
    })
  })
});