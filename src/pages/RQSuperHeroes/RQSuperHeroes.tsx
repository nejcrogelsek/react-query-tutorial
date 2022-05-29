import { FC, useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {}

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const RQSuperHeroes: FC<Props> = (props: Props) => {
  const [interval, setInterval] = useState<any>(3000)

  const onError = (error: Error) => {
    console.log('Perform side effect after encountering error', error)
    setInterval(false)
  }

  const onSuccess = (response: any) => {
    console.log('Perform side effect after encountering error', response)
    if (response.data.length >= 4) setInterval(false)
  }

  const { data, isLoading, isError, error, isFetching } = useQuery('super-heroes', fetchSuperHeroes, {
    onError,
    onSuccess,
    refetchInterval: interval,
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
      <ul>
        {data?.data.map((hero: SuperHero, index: number) => (
          <li key={index}>{hero.name}</li>
        ))}
      </ul>
    </>
  )
}

export default RQSuperHeroes
