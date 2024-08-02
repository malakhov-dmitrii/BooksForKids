import { useUpdateCartItemCount } from '@/hooks/api/useCart'
import { IAmProductCounterProps } from '@/types/goods'
import { useEffect } from 'react'

const ProductCounter = ({
  className,
  count,
  initialCount,
  totalCount,
  setCount,
  cartItem,
  updateCountAsync,
}: IAmProductCounterProps) => {
  const { mutate: updateCartItemCount } = useUpdateCartItemCount()
  const currentTotalCount = +(cartItem?.inStock ?? 0) || totalCount
  const currentInitialCount = +(cartItem?.count ?? 0) || initialCount || 1
  const disableDecrease = count === 1
  const disableIncrease = count === currentTotalCount

  useEffect(() => {
    setCount(currentInitialCount as number)
  }, [currentInitialCount])

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
      <button onClick={decrease} disabled={disableDecrease} />
      <h5>{count}</h5>
      <button onClick={increase} disabled={disableIncrease} />
    </div>
  )
}

export default ProductCounter
