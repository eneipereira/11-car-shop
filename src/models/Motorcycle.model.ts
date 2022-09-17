import { model as createMongooseModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import Model from './Model';

const motorcycleMongooseSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  status: Boolean,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

export default class MotorcycleModel extends Model<IMotorcycle> {
  constructor(model = createMongooseModel('Motorcycle', motorcycleMongooseSchema)) {
    super(model);
  }
}