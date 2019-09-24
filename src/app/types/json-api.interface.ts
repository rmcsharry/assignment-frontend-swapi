export interface JsonApi<T> {
  results: T[]
  count: number
  next: string
  previious: string

}
