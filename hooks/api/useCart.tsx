import { IAmProduct } from '@/types/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import _ky from 'ky'

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
const getCart = async () => {
  const response = await ky.get('cart/all')
  const data = await response.json()
  return data as CartItem[]
}
const addToCart = async (data: IAmProduct | IAmProduct[]) => {
  const dataArray = Array.isArray(data) ? data : [data]
  const url = dataArray.length > 1 ? 'cart/add-many' : 'cart/add'

  const response = await ky.post(url, {
    json: data,
  })
  const res = await response.json<unknown>()

  // @ts-expect-error ok here
  if (res.status > 300) {
    // @ts-expect-error ok here
    throw new Error(res.message)
  }

  return res as CartItem[]
}
const removeFromCart = async (id: string) => {
  const response = await ky.delete(`cart/delete?id=${id}`)
  const data = await response.json()
  return data
}
const updateCartItemCount = async (id?: string, count?: number) => {
  if (!id || !count) return
  const response = await ky.patch(`cart/count?id=${id}`, {
    json: { count },
  })
  const data = await response.json()
  return data
}

// ---- React Query hooks ----
const useCart = () => {
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  })

  return query
}

const useAddToCart = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (data: IAmProduct) => addToCart(data),
    onSuccess: () => toast.success('Item added to cart'),
    onError: (error) =>
      toast.error(`Error adding item to cart: ${error.message}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  return mutation
}

const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => removeFromCart(id),
    onSuccess: () => toast.success('Item removed from cart'),
    onError: () => toast.error('Error removing item from cart'),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  return mutation
}

const useUpdateCartItemCount = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ id, count }: { id?: string; count?: number }) =>
      updateCartItemCount(id, count),
    onError: (error) =>
      toast.error(`Error updating item count: ${error.message}`),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })

  return mutation
}

// ---- Exporting hooks ----
export { useCart, useAddToCart, useRemoveFromCart, useUpdateCartItemCount }

// ---- Types ----
export interface CartItem {
  _id: string
  count: number
  characteristics?: {
    authors: string[]
  }
  productId: string
  image: string
  name: string
  price: number
  inStock: string
  isDiscount: string
  category: string
}
