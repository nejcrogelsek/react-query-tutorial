import { useSuperHeroData } from 'lib/hooks/useSuperHeroData'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

const RQSuperHero: FC = () => {
  const onError = (error: Error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const onSuccess = (response: any) => {
    console.log('Perform side effect after encountering error', response)
  }

  const { heroId } = useParams()
  const { data, isLoading, isError, error } = useSuperHeroData({ onSuccess, onError, heroId: heroId ?? '' })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError && error instanceof Error) {
    return <h2>{error.message}</h2>
  }
  return (
    <div className="rq-super-hero">
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  )
}

export default RQSuperHero
