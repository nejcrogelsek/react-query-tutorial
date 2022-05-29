import { FC } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {}

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes1')
}

const RQSuperHeroes: FC<Props> = (props: Props) => {
  const onError = (error: Error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const onSuccess = (response: any) => {
    console.log('Perform side effect after encountering error', response)
  }

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery('super-heroes', fetchSuperHeroes, {
    onError,
    onSuccess,
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
