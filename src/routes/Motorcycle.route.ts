import { Router } from 'express';
import makeMotorcycleController from '../factories/Motorcycle.controller.factory';

const motorcycleRoute = Router();
const motorcycleController = makeMotorcycleController();

motorcycleRoute.route('/')
  .post(async (req, res) => motorcycleController.create(req, res))
  .get(async (req, res) => motorcycleController.read(req, res));

motorcycleRoute.route('/:id')
  .get(async (req, res) => motorcycleController.readOne(req, res))
  .put(async (req, res) => motorcycleController.update(req, res));

export default motorcycleRoute;