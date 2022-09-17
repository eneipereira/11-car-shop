import { Router } from 'express';
import makeMotorcycleController from '../factories/Motorcycle.controller.factory';

const motorcycleRoute = Router();
const motorcycleController = makeMotorcycleController();

motorcycleRoute.route('/')
  .post(async (req, res) => motorcycleController.create(req, res));

export default motorcycleRoute;