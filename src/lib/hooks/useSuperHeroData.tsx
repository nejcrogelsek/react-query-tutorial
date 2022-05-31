import { useQuery } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {
  onSuccess: (response: any) => void
  onError: (error: Error) => void
  heroId: string
}

const fetchSuperHero = (id: string) => {
  return axios.get(`http://localhost:4000/superheroes/${id}`)
}

export const useSuperHeroData = ({ onSuccess, onError, heroId }: Props) => {
  return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId), {
    onError,
    onSuccess,
  })
}
