import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car.controller';
import { Request, Response } from 'express';
import { allCarsMock, carMock, carMockWithId } from '../../mocks/carMock';
const { expect } = chai;

describe('src/controllers/car.controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;

  const res = {} as Response;

  before(() => {
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
});