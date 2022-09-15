export interface IService<T> {
  create(payload: T): Promise<T>
}