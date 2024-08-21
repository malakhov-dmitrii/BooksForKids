import { useCart } from './api/useCart'

export const useTotalPrice = () => {
  const { data: cart } = useCart()

  const newTotal =
    cart
      ?.map((item) => +item.price * +item.count)
      .reduce((defaultCount, item) => defaultCount + item, 0) ?? 0

  return { newTotal }
<<<<<<< HEAD
}
=======
}
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
