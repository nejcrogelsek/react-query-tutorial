import axios from 'axios'
import { FC } from 'react'
import { useQueries } from 'react-query'

interface Props {
  heroIds: number[]
}

const fetchSuperHero = (id: number) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`)
}

const DynamicParallelQueries: FC<Props> = ({ heroIds }: Props) => {
  const queryResults = useQueries(
    heroIds.map((id) => ({
      queryKey: ['superhero', id],
      queryFn: () => fetchSuperHero(id),
    })),
  )

  console.log(queryResults)
  return (
    <div className="dynamic-parallel-queries">
      <h1>DynamicParallelQueries</h1>
    </div>
  )
}

export default DynamicParallelQueries
