import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const errors: Record<string, number> = {
  InvalidMongoIdError: 400,
  NotFoundError: 404,
};

const errorHandler: ErrorRequestHandler = (err: Error | ZodError, _req, res, _next) => {
  const { name, message } = err;
  
  if (err instanceof ZodError) {
    res.status(400).json({ message: err.issues[0].message });
    return;
  }

  const status = errors[name];
  
  if (!status) {
    console.error(err);
    res.status(500).json({ message: 'Internal Error' });
    return;
  }

  res.status(status).json({ error: message });
};

export default errorHandler;