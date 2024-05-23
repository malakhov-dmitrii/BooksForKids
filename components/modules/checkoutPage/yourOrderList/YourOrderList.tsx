

import styles from '@/styles/orderInfoBlock/index.module.css'

import YourOrderItem from '../yourOrderItem/YourOrderItem'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLs } from '@/context/cart'

const YourOrderList = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)


  return (
    <>
        {currentCartByAuth.map((item) => (
          <li
            key={item._id || item.clientId}
            className={styles.order_list_item}
          >
            <YourOrderItem item={item} />
          </li>
        ))}
    </>
  )
}

export default YourOrderList