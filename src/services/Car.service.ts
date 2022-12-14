import NotFoundError from '../errors/NotFoundError';
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

  public async read(): Promise<ICar[]> {
    const cars = await this._model.read();

    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._model.readOne(_id);

    if (!car) throw new NotFoundError();

    return car;
  }

  public async update(_id: string, payload: unknown): Promise<ICar> {
    const parsed = Car.safeParse(payload);

    if (!parsed.success) throw parsed.error;

    const updatedCar = await this._model.update(_id, { ...parsed.data });

    if (!updatedCar) throw new NotFoundError();

    return updatedCar;
  }

  public async delete(_id: string): Promise<void> {
    const deletedCar = await this._model.delete(_id);

    if (!deletedCar) throw new NotFoundError();
  }
}