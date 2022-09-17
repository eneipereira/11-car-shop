import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(protected _service: Omit<IService<IMotorcycle>, 'delete'>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const newMotorcycle = await this._service.create(req.body);

    res.status(201).json(newMotorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();
    
    res.status(200).json(motorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const motorcycle = await this._service.readOne(req.params.id);
    
    res.status(200).json(motorcycle);
  }

  public async update(req: Request, res: Response<IMotorcycle>) {
    const updatedMotorcycle = await this._service.update(req.params.id, req.body);
  
    res.status(200).json(updatedMotorcycle);
  }
}