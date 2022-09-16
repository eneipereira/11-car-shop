export default class InvalidMongoIdError extends Error {
  constructor(message = 'Id must have 24 hexadecimal characters') {
    super(message);
    
    this.name = 'InvalidMongoIdError';
  }
}