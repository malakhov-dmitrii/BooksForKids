import { IAmProduct } from '@/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import _ky from 'ky'
import { FavoriteItem } from '@/types/favorites'


export const ky = _ky.create({
  prefixUrl: '/api',
  retry: 1,
  hooks: {
    beforeRequest: [
      (request) => {
        const auth = JSON.parse(localStorage.getItem('auth') as string)

        if (auth) {
          request.headers.set('Authorization', `Bearer ${auth.accessToken}`)
        }
      },
    ],
    beforeRetry: [
      async (request) => {
        const auth = JSON.parse(localStorage.getItem('auth') as string)

        if (!auth) return

        const res = await fetch('/api/users/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ jwt: auth.refreshToken }),
        })
        const data = await res.json()

        localStorage.setItem('auth', JSON.stringify(data))
        request.request.headers.set(
          'Authorization',
          `Bearer ${data.accessToken}`
        )
      },
    ],
  },
})

// ---- Fetching functions ----
const getFavorites = async () => {
  const response = await ky.get('favorites/all')
  const data = await response.json()
  return data as FavoriteItem[]
}
const addToFavorites = async (data: IAmProduct | IAmProduct[]) => {
  const dataArray = Array.isArray(data) ? data : [data]
  const url = dataArray.length > 1 ? 'favorites/add-many' : 'favorites/add'

  const response = await ky.post(url, {
    json: data,
  })
  const res = await response.json<unknown>()

  // @ts-expect-error ok here
  if (res.status > 300) {
    // @ts-expect-error ok here
    throw new Error(res.message)
  }

  return res as FavoriteItem[]
}
const removeFromFavorites = async (id: string) => {
  const response = await ky.delete(`favorites/delete?id=${id}`)
  const data = await response.json()
  return data
}

// ---- React Query hooks ----
const useFavorites = () => {
  const query = useQuery({
    queryKey: ['favorites'],
    queryFn: () => getFavorites(),
  })

  return query
}

const useAddToFavorites = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: IAmProduct) => addToFavorites(data),
    onSuccess: () => toast.success('Item added to favorites'),
    onError: (error) =>
      toast.error(`Error adding item to favorites: ${error.message}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return mutation
}

const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => removeFromFavorites(id),
    onSuccess: () => toast.success('Item removed from favorites'),
    onError: () => toast.error('Error removing item from favorites'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  })

  return mutation
}


// ---- Exporting hooks ----
export { useFavorites, useAddToFavorites, useRemoveFromFavorites }
