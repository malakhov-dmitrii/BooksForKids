import styles from '@/styles/cartPage/index.module.css'
import CartListItem from './CartListItem'
import { useCart } from '@/hooks/api/useCart'

const CartList = () => {
  const { data: cart } = useCart()

  return (
    <>
      {cart?.map((item) => (
        <li key={item._id || item.clientId} className={styles.cart_list_item}>
          <CartListItem item={item} />
        </li>
      ))}
    </>
  )
}

export default CartList
