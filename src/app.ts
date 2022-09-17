import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error.middleware';
import carRoute from './routes/Car.route';
import motorcycleRoute from './routes/Motorcycle.route';

const app = express();

app.use(express.json());

app.use('/cars', carRoute);
app.use('/motorcycles', motorcycleRoute);

app.use(errorHandler);

export default app;
