import { z } from 'zod';
import { Vehicle } from './IVehicle';

const MotorcycleOpt = z.object({
  category: z.union([z.literal('Street'), z.literal('Custom'), z.literal('Trail')]),
  engineCapacity: z.number().int().positive().lte(2500),
});

const Motorcycle = Vehicle.merge(MotorcycleOpt);

export type IMotorcycle = z.infer<typeof Motorcycle>;

export { Motorcycle };