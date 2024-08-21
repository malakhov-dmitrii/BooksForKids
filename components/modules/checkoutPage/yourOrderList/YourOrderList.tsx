import styles from '@/styles/orderInfoBlock/index.module.css'

import YourOrderItem from '../yourOrderItem/YourOrderItem'
import { useCart } from '@/hooks/api/useCart'

const YourOrderList = () => {
  const { data: cart } = useCart()

  return (
    <>
      {cart?.map((item) => (
        <li key={item._id} className={styles.order_list_item}>
          <YourOrderItem item={item} />
        </li>
      ))}
    </>
  )
}

export default YourOrderList