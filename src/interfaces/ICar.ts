import { z } from 'zod';
import { Vehicle } from './IVehicle';

const CarOpt = z.object({
  doorsQty: z.number().int().positive().gte(2)
    .lte(4),
  seatsQty: z.number().int().positive().gte(2)
    .lte(7),
});

const Car = Vehicle.merge(CarOpt);

export type ICar = z.infer<typeof Car>;

export { Car };