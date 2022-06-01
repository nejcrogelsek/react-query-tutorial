import axios from 'axios'
import { FC, useState } from 'react'
import { useQuery } from 'react-query'

interface Props {}

const fetchColors = (pageNumber: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

const PaginatedQueries: FC<Props> = (props: Props) => {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    },
  )

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>
  }
  return (
    <div className="paginated-queries">
      <h1>PaginatedQueries</h1>
      {data?.data.map((color: { id: number; label: string }, index: number) => (
        <div key={index}>
          <h2>
            {color.id}. {color.label}
          </h2>
        </div>
      ))}
      <div>
        <button onClick={() => setPageNumber((prev) => prev - 1)} disabled={pageNumber === 1}>
          Prev page
        </button>
        <button onClick={() => setPageNumber((prev) => prev + 1)} disabled={pageNumber === 4}>
          Next page
        </button>
        {isFetching && 'loading'}
      </div>
    </div>
  )
}

export default PaginatedQueries
