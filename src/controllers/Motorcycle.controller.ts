import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(protected _service: Pick<IService<IMotorcycle>, 'create' | 'read'>) { }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const newMotorcycle = await this._service.create(req.body);

    res.status(201).json(newMotorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const motorcycles = await this._service.read();
    
    res.status(200).json(motorcycles);
  }
}