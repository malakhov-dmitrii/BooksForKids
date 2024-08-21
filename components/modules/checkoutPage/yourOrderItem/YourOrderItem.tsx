import { useCartItemAction } from '@/hooks/useCartItemAction'
import { formatPrice } from '@/lib/utils/common'
import styles from '@/styles/orderInfoBlock/index.module.css'
import { CartItem } from '@/hooks/api/useCart'

const YourOrderItem = ({ item }: { item: CartItem }) => {
  const { count } = useCartItemAction(item)

  return (
    <>
      <div className={styles.order_item_container}>
        <h5>
          {item.name}
          {count > 1 ? <span> (x {count})</span> : ''}
        </h5>
        <h5>
          {item.isDiscount ? (
            <span>
              {formatPrice(
                +item.price * +item.count * (1 - +item.isDiscount / 100)
              )}
            </span>
          ) : (
            <span>{formatPrice(+item.price * +item.count)}</span>
          )}
        </h5>
      </div>
    </>
  )
}

export default YourOrderItem