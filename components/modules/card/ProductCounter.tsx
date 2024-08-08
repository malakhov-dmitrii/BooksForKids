import { useUpdateCartItemCount } from '@/hooks/api/useCart'
import { IAmProductCounterProps } from '@/types/goods'

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
