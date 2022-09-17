import { IModel } from '../interfaces/IModel';
import { IMotorcycle, Motorcycle } from '../interfaces/IMotorcycle';
// import { IService } from '../interfaces/IService';

export default class MotorcycleService {
  constructor(protected _model: IModel<IMotorcycle>) { }

  public async create(payload: unknown): Promise<IMotorcycle> {
    const parsed = Motorcycle.safeParse(payload);

    if (!parsed.success) throw parsed.error;

    const newMotorcycle = await this._model.create(parsed.data);

    return newMotorcycle;
  }
}