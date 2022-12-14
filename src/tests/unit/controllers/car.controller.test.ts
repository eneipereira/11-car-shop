import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car.controller';
import { Request, Response } from 'express';
import { allCarsMock, carMock, carMockWithId, toUpdateCarMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('src/controllers/car.controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;

  const res = {} as Response;

  before(() => {
    res.sendStatus = sinon.stub().returns(res);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })

  beforeEach(sinon.restore)

  describe('create', () => {
    it('should return a new created item', async () => {
      sinon.stub(carService, 'create').resolves(carMockWithId)

      req.body = carMock

      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true
    });
  })

  describe('read', () => {
    it('should return an array with all itens', async () => {
      sinon.stub(carService, 'read').resolves(allCarsMock)

      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(allCarsMock)).to.be.true
    })

    it('should return an empty array if there aren\'t itens', async () => {
      sinon.stub(carService, 'read').resolves([])

      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith([])).to.be.true
    })
  })

  describe('readOne', () => {
    it('should return an object with the right car as result', async () => {
      sinon.stub(carService, 'readOne').resolves(carMockWithId)

      req.params = { id: carMockWithId._id };

      await carController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true
    })
  })

  describe('update', () => {
    it('should return an object with the updated car as result', async () => {
      sinon.stub(carService, 'update').resolves(toUpdateCarMockWithId)

      req.params = { id: toUpdateCarMockWithId._id };

      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(toUpdateCarMockWithId)).to.be.true
    })
  })

  describe('delete', () => {
    it('should be called with status http 204', async () => {
      sinon.stub(carService, 'delete').resolves()

      req.params = { id: carMockWithId._id };

      await carController.delete(req, res)

      expect((res.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true
    })
  })
});