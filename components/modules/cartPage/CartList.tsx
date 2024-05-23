
import { $cart, $cartFromLs } from '@/context/cart'
import styles from '@/styles/cartPage/index.module.css'
import CartListItem from './CartListItem'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'

const CartList = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)


  return (
    <>
        {currentCartByAuth.map((item) => (
          <li
            key={item._id || item.clientId}
            className={styles.cart_list_item}
          >
            <CartListItem item={item} />
          </li>
        ))}
    </>
  )
}

export default CartList
