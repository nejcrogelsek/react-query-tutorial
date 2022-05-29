import { FC } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {}

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const RQSuperHeroes: FC<Props> = (props: Props) => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery('super-heroes', fetchSuperHeroes, {
    enabled: false,
  })

  console.log({ isLoading, isFetching })

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <button type="button" onClick={() => refetch()}>
        Fetch superheroes
      </button>
      <ul>
        {data?.data.map((hero: SuperHero, index: number) => (
          <li key={index}>{hero.name}</li>
        ))}
      </ul>
    </>
  )
}

export default RQSuperHeroes
