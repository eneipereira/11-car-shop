import * as sinon from 'sinon';
import chai, { use } from 'chai';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import { allMotorcyclesMock, motorcycleMock, motorcycleMockWithId, toUpdateMotorcycleMock, toUpdateMotorcycleMockWithId } from '../../mocks/motorcycleMock';
import chaiAsPromised from 'chai-as-promised';
import { SafeParseError, SafeParseSuccess, ZodError } from 'zod';
import { Motorcycle, IMotorcycle } from '../../../interfaces/IMotorcycle';
import NotFoundError from '../../../errors/NotFoundError';
const { expect } = chai;

use(chaiAsPromised)

describe('src/services/motorcycle.service', () => {
  const motorcycleModel = new MotorcycleModel
  const motorcycleService = new MotorcycleService(motorcycleModel)

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created motorcycle', async () => {
      sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId as IMotorcycle)

      const newMotorcycle = await motorcycleService.create(motorcycleMock)
      
      expect(newMotorcycle).to.deep.eq(motorcycleMockWithId)
    });
    
    it('should rejects with ZodError if an invalid argument is passed', async () => {
      sinon.stub(Motorcycle, 'safeParse').returns({ success: false, error: new ZodError([]) } as SafeParseError<IMotorcycle>)

      return expect(motorcycleService.create({})).to.be.eventually.rejectedWith(ZodError)
    })
  })

  describe('read', () => {
    it('should return an array with all motorcycles', async () => {
      sinon.stub(motorcycleModel, 'read').resolves(allMotorcyclesMock as IMotorcycle[])

      const motorcycle = await motorcycleService.read()
      
      expect(motorcycle[0]).to.deep.eq(allMotorcyclesMock[0])
    });
    
    it('should return an empty array if there aren\'t motorcycles', async () => {
      sinon.stub(motorcycleModel, 'read').resolves([])

      const motorcycle = await motorcycleService.read()

      expect(motorcycle).to.deep.eq([])
    })
  })

  describe('readOne', () => {
    it('should return an object with the right motorcycle as result', async () => {
      sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleMockWithId as IMotorcycle)

      const motorcycle = await motorcycleService.readOne(motorcycleMockWithId._id)
      
      expect(motorcycle).to.deep.eq(motorcycleMockWithId)
    });
    
    it('should return a NotFoundError if no motorcycle is found with the passed id', async () => {
      sinon.stub(motorcycleModel, 'readOne').resolves(null)

      return expect(motorcycleService.readOne('ObjectIdErrado'))
        .to.be.eventually.rejectedWith(NotFoundError)
    })
  })
  
  describe('update', () => {
    it('should return an object with the updated motorcycle as result', async () => {
      sinon.stub(Motorcycle, 'safeParse').returns({ success: true, data: toUpdateMotorcycleMock } as SafeParseSuccess<IMotorcycle>)
      sinon.stub(motorcycleModel, 'update').resolves(toUpdateMotorcycleMockWithId as IMotorcycle)
      
      const updatedMotorcycle = await motorcycleService.update(toUpdateMotorcycleMockWithId._id, toUpdateMotorcycleMock)
      
      expect(updatedMotorcycle).to.be.deep.eq(toUpdateMotorcycleMockWithId)
    });
    
    it('should rejects with ZodError if an invalid argument is passed', async () => {
      sinon.stub(Motorcycle, 'safeParse').returns({ success: false, error: new ZodError([]) } as SafeParseError<IMotorcycle>)
      
      return expect(motorcycleService.update(toUpdateMotorcycleMockWithId._id, {}))
      .to.be.eventually.rejectedWith(ZodError)
    })
    
    it('should return a NotFoundError if no motorcycle is found with the passed id', async () => {
      sinon.stub(motorcycleModel, 'update').resolves(null)

      return expect(motorcycleService.update('ObjectIdErrado', toUpdateMotorcycleMock))
      .to.be.eventually.rejectedWith(NotFoundError)
    })
  })
  
    describe('delete', () => {
      it('should return undefined if the motorcycle was deleted', async () => {
        sinon.stub(motorcycleModel, 'delete').resolves(toUpdateMotorcycleMockWithId as IMotorcycle) 
        
        return expect(motorcycleService.delete(toUpdateMotorcycleMockWithId._id)).to.eventually.be.undefined
      });
      
      it('should return a NotFoundError if no motorcycle is found with the passed id', async () => {
        sinon.stub(motorcycleModel, 'delete').resolves(null)
  
        return expect(motorcycleService.delete('ObjectIdErrado'))
          .to.be.eventually.rejectedWith(NotFoundError)
      })
    })
});