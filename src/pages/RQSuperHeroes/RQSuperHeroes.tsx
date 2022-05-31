import { FC } from 'react'
import { useSuperHeroesData } from 'lib/hooks/useSuperHeroesData'
import { SuperHero } from 'interfaces'
import { Link } from 'react-router-dom'

interface Props {}

const RQSuperHeroes: FC<Props> = (props: Props) => {
  const onError = (error: Error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const onSuccess = (response: any) => {
    console.log('Perform side effect after encountering error', response)
  }

  const { data, isLoading, isError, error, isFetching } = useSuperHeroesData({ onSuccess, onError })

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
        {data.data.map((hero: SuperHero, index: number) => (
          <li key={index}>
            <Link to={`/rq-superheroes/${hero.id}`}>{hero.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default RQSuperHeroes
