import { useQuery } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {
  onSuccess: (response: any) => void
  onError: (error: Error) => void
}

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

export const useSuperHeroesData = ({ onSuccess, onError }: Props) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onError,
    onSuccess,
  })
}
