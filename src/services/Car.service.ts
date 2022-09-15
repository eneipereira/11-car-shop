import { ICar, Car } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  constructor(private _model: IModel<ICar>) { }

  public async create(payload: unknown): Promise<ICar> {
    const parsed = Car.safeParse(payload);

    if (!parsed.success) throw parsed.error;

    const newCar = await this._model.create(parsed.data);

    return newCar;
  }
}