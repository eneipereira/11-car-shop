import * as sinon from 'sinon';
import chai, { use } from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import { allCarsMock, carMock, carMockWithId, toUpdateCarMock, toUpdateCarMockWithId } from '../../mocks/carMock';
import chaiAsPromised from 'chai-as-promised';
import { SafeParseError, SafeParseReturnType, SafeParseSuccess, ZodError } from 'zod';
import { Car, ICar } from '../../../interfaces/ICar';
import NotFoundError from '../../../errors/NotFoundError';
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

  describe('read', () => {
    it('should return an array with all itens', async () => {
      sinon.stub(carModel, 'read').resolves(allCarsMock)
      const car = await carService.read()
      
      expect(car[0]).to.deep.eq(allCarsMock[0])
    });
    
    it('should return an empty array if there aren\'t itens', async () => {
      sinon.stub(carModel, 'read').resolves([])

      const car = await carService.read()

      expect(car).to.deep.eq([])
    })
  })

  describe('readOne', () => {
    it('should return an object with the right car as result', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockWithId)

      const car = await carService.readOne(carMockWithId._id)
      
      expect(car).to.deep.eq(carMockWithId)
    });
    
    it('should return a NotFoundError if no car is found with the passed id', async () => {
      sinon.stub(carModel, 'readOne').resolves(null)

      return expect(carService.readOne('ObjectIdErrado'))
        .to.be.eventually.rejectedWith(NotFoundError)
    })
  })
  
  describe('update', () => {
    it('should return an object with the updated car as result', async () => {
      sinon.stub(Car, 'safeParse').returns({ success: true, data: toUpdateCarMock } as SafeParseSuccess<ICar>)
      sinon.stub(carModel, 'update').resolves(toUpdateCarMockWithId)
      
      const updatedCar = await carService.update(toUpdateCarMockWithId._id, toUpdateCarMock)
      
      expect(updatedCar).to.be.deep.eq(toUpdateCarMockWithId)
    });
    
    it('should rejects with ZodError if an invalid argument is passed', async () => {
      sinon.stub(Car, 'safeParse').returns({ success: false, error: new ZodError([]) } as SafeParseError<ICar>)
      
      return expect(carService.update(toUpdateCarMockWithId._id, {}))
      .to.be.eventually.rejectedWith(ZodError)
    })
    
    it('should return a NotFoundError if no car is found with the passed id', async () => {
      sinon.stub(carModel, 'update').resolves(null)

      return expect(carService.update('ObjectIdErrado', toUpdateCarMock))
      .to.be.eventually.rejectedWith(NotFoundError)
    })
  })
  
    describe('delete', () => {
      it('should return undefined if the car was deleted', async () => {
        sinon.stub(carModel, 'delete').resolves(carMockWithId) 
        
        return expect(carService.delete(carMockWithId._id)).to.eventually.be.undefined
      });
      
      it('should return a NotFoundError if no car is found with the passed id', async () => {
        sinon.stub(carModel, 'delete').resolves(null)
  
        return expect(carService.delete('ObjectIdErrado'))
          .to.be.eventually.rejectedWith(NotFoundError)
      })
    })
});