import { Router } from 'express';
import CarController from '../controllers/Car.controller';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';

const carRoute = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRoute.route('/')
  .post((req, res) => carController.create(req, res));

export default carRoute; 