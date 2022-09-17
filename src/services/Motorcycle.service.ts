import NotFoundError from '../errors/NotFoundError';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, Motorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleService implements IService<IMotorcycle> {
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

  public async update(_id: string, payload: unknown): Promise<IMotorcycle> {
    const parsed = Motorcycle.safeParse(payload);

    if (!parsed.success) throw parsed.error;

    const updatedMotorcycle = await this._model.update(_id, { ...parsed.data });

    if (!updatedMotorcycle) throw new NotFoundError();

    return updatedMotorcycle;
  }

  public async delete(_id: string): Promise<void> {
    const deletedMotorcycle = await this._model.delete(_id);

    if (!deletedMotorcycle) throw new NotFoundError();
  }
}