import { isValidObjectId, Model as MongoModel, UpdateQuery } from 'mongoose';
import InvalidMongoIdError from '../errors/InvalidMongoIdError';
import { IModel } from '../interfaces/IModel';

export default abstract class Model<T> implements IModel<T> {
  protected _model: MongoModel<T>;

  constructor(model: MongoModel<T>) {
    this._model = model;
  }

  public async create(payload: T): Promise<T> {
    const created = await this._model.create({ ...payload });

    return created;
  }

  public async read(): Promise<T[]> {
    const itens = await this._model.find();

    return itens;
  }

  public async readOne(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new InvalidMongoIdError();
    
    const item = await this._model.findById(_id);

    return item;
  }
  
  public async update(_id: string, payload: T): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new InvalidMongoIdError();

    const updated = await this._model.findByIdAndUpdate(
      _id,
      { ...payload } as UpdateQuery<T>,
      { new: true },
    );

    return updated;
  }
  
  public async delete(_id: string): Promise<T | null> {
    if (!isValidObjectId(_id)) throw new InvalidMongoIdError();

    const deleted = await this._model.findByIdAndDelete(_id);

    return deleted;
  }
}