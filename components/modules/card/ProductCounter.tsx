import { useUpdateCartItemCount } from '@/hooks/api/useCart'
import { IAmProductCounterProps } from '@/types/goods'
<<<<<<< HEAD
=======
import { useEffect } from 'react'
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5

const ProductCounter = ({
  className,
  count,
  totalCount,
  setCount,
  cartItem,
  updateCountAsync,
}: IAmProductCounterProps) => {
  const { mutate: updateCartItemCount } = useUpdateCartItemCount()
  const currentTotalCount = +(cartItem?.inStock ?? 0) || totalCount
<<<<<<< HEAD
=======
  const currentInitialCount = +(cartItem?.count ?? 0) || initialCount || 1
  const disableDecrease = count === 1
  const disableIncrease = count === currentTotalCount

  useEffect(() => {
    setCount(currentInitialCount as number)
  }, [currentInitialCount])
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5

  const increase = async () => {
    setCount(count + 1)

    if (updateCountAsync) {
      updateCartItemCount({ id: cartItem?._id, count: count + 1 })
    }
  }

  const decrease = async () => {
    setCount(count - 1)

    if (updateCountAsync) {
      updateCartItemCount({ id: cartItem?._id, count: count - 1 })
    }
  }

  return (
    <div className={className}>
      <button onClick={decrease} disabled={count === 1} />
      <h5>{count}</h5>
      <button onClick={increase} disabled={count === currentTotalCount} />
    </div>
  )
}

export default ProductCounter
