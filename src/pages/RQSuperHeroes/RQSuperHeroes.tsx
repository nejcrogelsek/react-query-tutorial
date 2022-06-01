import { FC, FormEvent, useState } from 'react'
import { useSuperHeroesData, useAddSuperHeroData } from 'lib/hooks/useSuperHeroesData'
import { SuperHero } from 'interfaces'
import { Link } from 'react-router-dom'

interface Props {}

const RQSuperHeroes: FC<Props> = (props: Props) => {
  const [name, setName] = useState<string>('')
  const [alterEgo, setAlterEgo] = useState<string>('')

  const onError = (error: Error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const onSuccess = (response: any) => {
    console.log('Perform side effect after encountering error', response)
  }

  const { data, isLoading, isError, error, isFetching, refetch } = useSuperHeroesData({ onSuccess, onError })

  const { mutate: addHero, isLoading: isLoadingHero, isError: isErrorHero, error: errorHero } = useAddSuperHeroData()

  console.log({ isLoading, isFetching })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const hero = {
      name,
      alterEgo,
    }
    addHero(hero)
  }

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQ Super Heroes</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" id="name" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button type="submit">Add hero</button>
      </form>
      <button onClick={() => refetch()}>Refetch heroes</button>
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
