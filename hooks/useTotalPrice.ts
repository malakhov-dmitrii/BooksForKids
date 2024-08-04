import { useCart } from './api/useCart'

export const useTotalPrice = () => {
  const { data: cart } = useCart()

  const newTotal =
    cart
      ?.map((item) => +item.price * +item.count)
      .reduce((defaultCount, item) => defaultCount + item, 0) ?? 0

  return { newTotal }
}
