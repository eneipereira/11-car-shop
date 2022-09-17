import * as sinon from 'sinon';
import chai, { use } from 'chai';
import Mongoose from 'mongoose';
import { Model as MotorcycleDAO } from 'mongoose';
import { allMotorcyclesMock, motorcycleMock, motorcycleMockWithId, toUpdateMotorcycleMock, toUpdateMotorcycleMockWithId } from '../../mocks/motorcycleMock';
import MotorcycleModel from '../../../models/Motorcycle.model';
import chaiAsPromised from 'chai-as-promised';
import InvalidMongoIdError from '../../../errors/InvalidMongoIdError';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

use(chaiAsPromised)

describe('src/models/motorcycle.model', () => {
  const motorcycleModel = new MotorcycleModel();

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created motorcycle', async () => {
      sinon.stub(MotorcycleDAO, 'create').resolves(motorcycleMockWithId)
      
      const newMotorcycle = await motorcycleModel.create(motorcycleMock as IMotorcycle)

      expect(newMotorcycle).to.deep.eq(motorcycleMockWithId)
    });
  })

  describe('read', () => {
    it('should return an array with all motorcycles', async () => {
      sinon.stub(MotorcycleDAO, 'find').resolves(allMotorcyclesMock)

      const motorcycles = await motorcycleModel.read()

      expect(motorcycles[0]).to.deep.eq(allMotorcyclesMock[0])
    })

    it('should return an empty array if there aren\'t motorcycles', async () => {
      sinon.stub(MotorcycleDAO, 'find').resolves([])

      const motorcycles = await motorcycleModel.read()

      expect(motorcycles).to.deep.eq([])
    })
  })

  describe('readOne', () => {
    it('should return an object with the right motorcycle as result', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(true)
      sinon.stub(MotorcycleDAO, 'findById').resolves(motorcycleMockWithId)
    
      const motorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id)
    
      expect(motorcycle).to.deep.eq(motorcycleMockWithId)
    })
    
    it('should throw an InvalidMongoIderror if an invalid id is passed', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(false)
      
      return expect(motorcycleModel.readOne('ObjectIdInvalido'))
        .to.be.eventually.rejectedWith(InvalidMongoIdError)
    })
  })

  describe('update', () => {
    it('should return an object with the updated motorcycle as result', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(true)
      sinon.stub(MotorcycleDAO, 'findByIdAndUpdate').resolves(toUpdateMotorcycleMockWithId)
    
      const updatedMotorcycle = await motorcycleModel.update(toUpdateMotorcycleMockWithId._id, toUpdateMotorcycleMock as IMotorcycle)
    
      expect(updatedMotorcycle).to.deep.eq(toUpdateMotorcycleMockWithId)
    })
    
    it('should throw an InvalidMongoIderror if an invalid id is passed', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(false)
      
      return expect(motorcycleModel.update('ObjectIdInvalido', toUpdateMotorcycleMock as IMotorcycle))
        .to.be.eventually.rejectedWith(InvalidMongoIdError)
    })
  })

  describe('delete', () => {
    it('should return an object with the deleted motorcycle as result', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(true)
      sinon.stub(MotorcycleDAO, 'findByIdAndDelete').resolves(motorcycleMockWithId)
    
      const deletedMotorcycle = await motorcycleModel.delete(motorcycleMockWithId._id)
    
      expect(deletedMotorcycle).to.deep.eq(motorcycleMockWithId)
    })
    
    it('should throw an InvalidMongoIderror if an invalid id is passed', async () => {
      sinon.stub(Mongoose, 'isValidObjectId').returns(false)
      
      return expect(motorcycleModel.delete('ObjectIdInvalido'))
        .to.be.eventually.rejectedWith(InvalidMongoIdError)
    })
  })
});