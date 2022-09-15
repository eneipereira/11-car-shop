import { Router } from 'express';
import makeCarController from '../factories/Car.controller.factory';

const carRoute = Router();
const carController = makeCarController();

carRoute.route('/')
  .post(async (req, res) => carController.create(req, res));

export default carRoute; 