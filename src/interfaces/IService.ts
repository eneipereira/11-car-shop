export interface IService<T> {
  create(payload: T): Promise<T>
  read(): Promise<T[]>
  readOne(_id: string): Promise<T>
  update(_id: string, payload: T): Promise<T>
  delete(_id: string): Promise<void>
}