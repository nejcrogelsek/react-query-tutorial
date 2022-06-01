import axios from 'axios'
import { FC, Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'

interface Props {}

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

const InfiniteQueries: FC<Props> = (props: Props) => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(['colors'], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1
        } else {
          return undefined
        }
      },
    })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>
  }
  return (
    <div className="paginated-queries">
      <h1>Infinite queries</h1>
      {data?.pages.map((group, index: number) => (
        <Fragment key={index}>
          {group.data.map((color: { id: number; label: string }, index: number) => (
            <h2 key={index}>
              {color.id}. {color.label}
            </h2>
          ))}
        </Fragment>
      ))}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  )
}

export default InfiniteQueries
