import { model as createMongooseModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import Model from './Model';

const carMongooseSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  seatsQty: Number,
  doorsQty: Number,
  status: Boolean,
}, { versionKey: false });

export default class CarModel extends Model<ICar> {
  constructor(model = createMongooseModel('Car', carMongooseSchema)) {
    super(model);
  }
}