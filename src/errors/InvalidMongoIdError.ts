export default class InvalidMongoIdError extends Error {
  constructor(message = 'Id must be a 24 characters hexadecimal') {
    super(message);
    
    this.name = 'InvalidMongoIdError';
  }
}