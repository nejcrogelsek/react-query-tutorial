import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {}

const SuperHeroes: FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<SuperHero[]>([])

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h1>SuperHeroes</h1>
      <ul>
        {data.map((hero: SuperHero, index: number) => (
          <li key={index}>{hero.name}</li>
        ))}
      </ul>
    </>
  )
}

export default SuperHeroes
