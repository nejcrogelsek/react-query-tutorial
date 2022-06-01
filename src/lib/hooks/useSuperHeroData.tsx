import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { SuperHero } from 'interfaces'

interface Props {
  onSuccess: (response: any) => void
  onError: (error: Error) => void
  heroId: string
}

const fetchSuperHero = ({ queryKey }: { queryKey: any[] }) => {
  const id = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${id}`)
}

export const useSuperHeroData = ({ onSuccess, onError, heroId }: Props) => {
  const queryClient = useQueryClient()
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    onError,
    onSuccess,
    initialData: () => {
      const hero = (queryClient.getQueryData('super-heroes') as any)?.data?.find(
        (hero: SuperHero) => hero.id === parseInt(heroId),
      )

      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    },
  })
}
