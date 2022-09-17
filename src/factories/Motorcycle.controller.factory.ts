import MotorcycleController from '../controllers/Motorcycle.controller';
import MotorcycleModel from '../models/Motorcycle.model';
import MotorcycleService from '../services/Motorcycle.service';

const makeMotorcycleController = (): MotorcycleController => {
  const motorcycle = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycle);
  const motorcycleController = new MotorcycleController(motorcycleService);
  
  return motorcycleController;  
};

export default makeMotorcycleController;