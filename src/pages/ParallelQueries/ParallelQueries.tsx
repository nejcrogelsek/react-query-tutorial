import axios from 'axios'
import { Friend, SuperHero } from 'interfaces'
import { FC } from 'react'
import { useQuery } from 'react-query'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

const ParallelQueries: FC = () => {
  const { data: superheroes } = useQuery('superheroes', fetchSuperHeroes)
  const { data: friends } = useQuery('friends', fetchFriends)

  return (
    <div className="parallel-queries">
      <h1>ParallelQueries</h1>
      <h2>Superheroes</h2>
      {superheroes?.data.map((hero: SuperHero, index: number) => (
        <div key={index}>{hero.name}</div>
      ))}
      <h2>Friends</h2>
      {friends?.data.map((friend: Friend, index: number) => (
        <div key={index}>{friend.name}</div>
      ))}
    </div>
  )
}

export default ParallelQueries
