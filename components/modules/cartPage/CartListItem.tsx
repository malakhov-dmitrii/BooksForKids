import Image from 'next/image'
import { useCartItemAction } from '@/hooks/useCartItemAction'
// import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatPrice } from '@/lib/utils/common'
import styles from '@/styles/cartPage/index.module.css'
import DeleteItemBtn from '@/components/elements/deleteItemBtn/DeleteItemBtn'
import Link from 'next/link'
import ProductCounter from '../card/ProductCounter'
import { useRemoveFromCart } from '@/hooks/api/useCart'
import { CartItem } from '@/types/cart'

const CartListItem = ({ item }: { item: CartItem }) => {
  const { count, setCount } = useCartItemAction(item)
  const removeFromCart = useRemoveFromCart()

  return (
    <>
      <DeleteItemBtn
        btnDisabled={false}
        className={styles.cart_list_item_delete}
        callback={() => removeFromCart.mutate({ id: item._id })}
      />
      <div className={styles.cart_list_item_img}>
        <Image
          src={item.image}
          alt={item.image}
          width={136}
          height={136}
          className={styles.cart_list_item_image}
        />
      </div>
      <div className={styles.cart_list_item_content}>
        <div className={styles.cart_list_item_content_left}>
          <Link
            href={`/catalog/${item.category}/${item.productId}`}
            className={styles.cart_list_item_title}
          >
            <h3>
              {item.name} | {item.characteristics?.authors}
            </h3>
          </Link>
          {item.isDiscount ? (
            <h5>
              <span
                className={`line_through ${styles.cart_list_item_discount} ${styles.cart_list_item_price}`}
              >
                {formatPrice(+item.price)}
              </span>
              <span
                className={`${styles.cart_list_item_price}`}
              >{`${formatPrice(+item.price * (1 - +item.isDiscount / 100))}`}</span>
            </h5>
          ) : (
            <h5 className={styles.cart_list_item_price}>
              {formatPrice(+item.price)}
            </h5>
          )}
        </div>
        <ProductCounter
          className={styles.cart_list_item_content_right}
          count={count}
          setCount={setCount}
          cartItem={item}
          updateCountAsync
        />
      </div>
    </>
  )
}

export default CartListItem
