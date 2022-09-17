import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import MotorcycleController from '../../../controllers/Motorcycle.controller';
import { Request, Response } from 'express';
import { allMotorcyclesMock, motorcycleMock, motorcycleMockWithId, toUpdateMotorcycleMockWithId } from '../../mocks/motorcycleMock';
import { IMotorcycle } from '../../../interfaces/IMotorcycle';
const { expect } = chai;

describe('src/controllers/motorcycle.controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;

  const res = {} as Response;

  before(() => {
    res.sendStatus = sinon.stub().returns(res);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created motorcycle', async () => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId as IMotorcycle)

      req.body = motorcycleMock

      await motorcycleController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true
    });
  })

  describe('read', () => {
    it('should return an array with all motorcycles', async () => {
      sinon.stub(motorcycleService, 'read').resolves(allMotorcyclesMock as IMotorcycle[])

      await motorcycleController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(allMotorcyclesMock)).to.be.true
    })

    it('should return an empty array if there aren\'t motorcycles', async () => {
      sinon.stub(motorcycleService, 'read').resolves([])

      await motorcycleController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith([])).to.be.true
    })
  })

  describe('readOne', () => {
    it('should return an object with the right motorcycle as result', async () => {
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId as IMotorcycle)

      req.params = { id: motorcycleMockWithId._id };

      await motorcycleController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true
    })
  })

  describe('update', () => {
    it('should return an object with the updated motorcycle as result', async () => {
      sinon.stub(motorcycleService, 'update').resolves(toUpdateMotorcycleMockWithId as IMotorcycle)

      req.params = { id: toUpdateMotorcycleMockWithId._id };

      await motorcycleController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(toUpdateMotorcycleMockWithId)).to.be.true
    })
  })

  describe('delete', () => {
    it('should be called with status http 204', async () => {
      sinon.stub(motorcycleService, 'delete').resolves()

      req.params = { id: motorcycleMockWithId._id };

      await motorcycleController.delete(req, res)

      expect((res.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true
    })
  })
});