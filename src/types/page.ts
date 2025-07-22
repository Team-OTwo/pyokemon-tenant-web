interface PageableSort {
  direction: "ASC" | "DESC"
  property: string
  ignoreCase: boolean
  nullHandling: string
  ascending: boolean
  descending: boolean
}

interface Pageable {
  pageNumber: number
  pageSize: number
  sort: PageableSort[]
  offset: number
  unpaged: boolean
  paged: boolean
}

interface Page<T> {
  content: T[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  number: number
  size: number
  sort: PageableSort[]
  first: boolean
  numberOfElements: number
  empty: boolean
}

export type { Page }
