import Image from 'next/image'
import { IAmCartItem } from '@/types/cart'
import { useCartItemAction } from '@/hooks/useCartItemAction'
// import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatPrice } from '@/lib/utils/common'
import { useLang } from "@/hooks/useLang";
import styles from '@/styles/cartPage/index.module.css'
import DeleteItemBtn from '@/components/elements/deleteItemBtn/DeleteItemBtn'
import CartPopupItem from '../header/CartPopup/CartPopupItem'
import Link from 'next/link'
import ProductCounter from '../card/ProductCounter';

const CartListItem = ({ item }: { item: IAmCartItem }) => {
  const { lang, translations } = useLang();
  const {
    price,
    count,
    setCount,
    handleDeleteCartItem,
  } = useCartItemAction(item)
  // const isMedia530 = useMediaQuery(530)
  // const imageSize = isMedia530 ? 132 : 160

  return (
    <>
      <DeleteItemBtn
        btnDisabled={false} 
        className={styles.cart_list_item_delete}
        callback={handleDeleteCartItem}
      />
      <div className={styles.cart_list_item_img}>
          <Image src={item.image} alt={item.image} width={136} height={136} className={styles.cart_list_item_image} />
       </div>
       <div className={styles.cart_list_item_content}>
            <div className={styles.cart_list_item_content_left}>
            <Link href={`/catalog/${item.category}/${item.productId}`} className={styles.cart_list_item_title}>
                <h3>
                    {item.name} | {item.authors}
                </h3>
            </Link>
            {item.isDiscount
              ? <h5>
                <span className={`line_through ${styles.cart_list_item_discount} ${styles.cart_list_item_price}`}>{formatPrice(+item.price)}</span>
                <span className={`${styles.cart_list_item_price}`}>{`${formatPrice(+item.price * (1 - (+item.isDiscount)/100))}`}</span> 
              </h5>
              : <h5 className={styles.cart_list_item_price}>
              {formatPrice(+item.price)}
              </h5>
            }
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

