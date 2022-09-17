import NotFoundError from '../errors/NotFoundError';
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

  public async read(): Promise<IMotorcycle[]> {
    const motorcycle = await this._model.read();

    return motorcycle;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._model.readOne(_id);

    if (!motorcycle) throw new NotFoundError();

    return motorcycle;
  }
}