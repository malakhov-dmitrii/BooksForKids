import { updateCartItemCount } from '@/context/cart'
import { updateCartItemCountInLS } from '@/lib/utils/cart'
import { isUserAuth } from '@/lib/utils/common'
import { IAmProductCounterProps } from '@/types/goods'
import { useEffect, useState } from 'react'

const ProductCounter = ({
  className,
  count,
  initialCount,
  totalCount,
  setCount,
  cartItem,
  updateCountAsync,
}: IAmProductCounterProps) => {
  const [disableIncrease, setDisableIncrease] = useState(false)
  const [disableDecrease, setDisableDecrease] = useState(false)
  const currentTotalCount = +cartItem?.inStock || totalCount
  const currentInitialCount = +cartItem?.count || initialCount || 1

  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    } else {
      setDisableDecrease(false)
    }

    if (count === currentTotalCount) {
      setDisableIncrease(true)
    } else {
      setDisableIncrease(false)
    }
  }, [count, currentTotalCount])

  useEffect(() => {
    setCount(currentInitialCount as number)
  }, [currentInitialCount])

  const updateCountWithRequest = (count: number) => {
    updateCartItemCountInLS(cartItem.clientId, count)
    if (!isUserAuth()) {
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    updateCartItemCount({
      jwt: auth.accessToken,
      id: cartItem._id,
      count,
    })
  }

  const increase = async () => {
    setDisableDecrease(false)
    setCount(count + 1)

    if (updateCountAsync) {
      updateCountWithRequest(count + 1)
    }
  }

  const decrease = async () => {
    setDisableIncrease(false)
    setCount(count - 1)

    if (updateCountAsync) {
      updateCountWithRequest(count - 1)
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
