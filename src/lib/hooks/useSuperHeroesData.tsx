import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {
  onSuccess: (response: any) => void
  onError: (error: Error) => void
}

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero: { name: string; alterEgo: string }) => {
  return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = ({ onSuccess, onError }: Props) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onError,
    onSuccess,
  })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: (response) => {
      queryClient.setQueryData('super-heroes', (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, response.data],
        }
      })
    },
  })
}
