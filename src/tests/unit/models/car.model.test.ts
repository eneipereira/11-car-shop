import * as sinon from 'sinon';
import chai, { use } from 'chai';
import Mongoose from 'mongoose';
import { Model as CarDAO } from 'mongoose';
import { allCarsMock, carMock, carMockWithId, toUpdateCarMock, toUpdateCarMockWithId } from '../../mocks/carMock';
import CarModel from '../../../models/Car.model';
import chaiAsPromised from 'chai-as-promised';
import InvalidMongoIdError from '../../../errors/InvalidMongoIdError';
const { expect } = chai;

use(chaiAsPromised)

describe('src/models/car.model', () => {
  const carModel = new CarModel();

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created car', async () => {
      sinon.stub(CarDAO, 'create').resolves(carMockWithId)
      
      const newCar = await carModel.create(carMock)

      expect(newCar).to.deep.eq(carMockWithId)
    });
  })

  describe('read', () => {
    it('should return an array with all cars', async () => {
      sinon.stub(CarDAO, 'find').resolves(allCarsMock)

      const cars = await carModel.read()

      expect(cars[0]).to.deep.eq(allCarsMock[0])
    })

    it('should return an empty array if there aren\'t cars', async () => {
      sinon.stub(CarDAO, 'find').resolves([])

      const cars = await carModel.read()

      expect(cars).to.deep.eq([])
    })
  })

  describe('readOne', () => {
    it('should return an object with the right car as result', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(true)
      sinon.stub(CarDAO, 'findById').resolves(carMockWithId)
    
      const car = await carModel.readOne(carMockWithId._id)
    
      expect(car).to.deep.eq(carMockWithId)
    })
    
    it('should throw an InvalidMongoIderror if an invalid id is passed', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(false)
      
      return expect(carModel.readOne('ObjectIdInvalido'))
        .to.be.eventually.rejectedWith(InvalidMongoIdError)
    })
  })

  describe('update', () => {
    it('should return an object with the updated car as result', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(true)
      sinon.stub(CarDAO, 'findByIdAndUpdate').resolves(toUpdateCarMockWithId)
    
      const updatedCar = await carModel.update(toUpdateCarMockWithId._id, toUpdateCarMock)
    
      expect(updatedCar).to.deep.eq(toUpdateCarMockWithId)
    })
    
    it('should throw an InvalidMongoIderror if an invalid id is passed', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(false)
      
      return expect(carModel.update('ObjectIdInvalido', toUpdateCarMock))
        .to.be.eventually.rejectedWith(InvalidMongoIdError)
    })
  })
});