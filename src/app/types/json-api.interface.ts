export interface JsonApi<T> {
  results: T[]
  count: number
  next: string
  previous: string
}
