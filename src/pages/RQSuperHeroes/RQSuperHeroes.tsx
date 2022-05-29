import { FC } from 'react'
import { useSuperHeroesData } from 'lib/hooks/useSuperHeroesData'

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
        {data.map((heroName: string, index: number) => (
          <li key={index}>{heroName}</li>
        ))}
      </ul>
    </>
  )
}

export default RQSuperHeroes
