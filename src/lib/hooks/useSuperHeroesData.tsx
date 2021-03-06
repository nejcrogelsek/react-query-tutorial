import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { request } from 'api/Api'

interface Props {
  onSuccess: (response: any) => void
  onError: (error: Error) => void
}

const fetchSuperHeroes = () => {
  return request({ url: '/superheroes' })
}

const addSuperHero = (hero: { name: string; alterEgo: string }) => {
  return request({ url: '/superheroes', method: 'post', data: hero })
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
    // onSuccess: (response) => {
    //   queryClient.setQueryData('super-heroes', (oldQueryData: any) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, response.data],
    //     }
    //   })
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries('super-heroes')
      const previousHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData.data.length + 1,
              ...newHero,
            },
          ],
        }
      })
      return {
        previousHeroData,
      }
    },
    onError: (_error, _hero, context: any) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    },
  })
}
