import CarController from '../controllers/Car.controller';
import CarModel from '../models/Car.model';
import CarService from '../services/Car.service';

const makeCarController = (): CarController => {
  const car = new CarModel();
  const carService = new CarService(car);
  const carController = new CarController(carService);
  return carController;  
};

export default makeCarController;