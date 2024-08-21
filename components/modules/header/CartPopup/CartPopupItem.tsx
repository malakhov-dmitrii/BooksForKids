import DeleteItemBtn from '@/components/elements/deleteItemBtn/DeleteItemBtn'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import Image from 'next/image'
import { useLang } from '@/hooks/useLang'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils/common'
import ProductCounter from '../../card/ProductCounter'
import { useRemoveFromCart } from '@/hooks/api/useCart'
import { CartItem } from '@/types/cart'

const CartPopupItem = ({ item }: { item: CartItem }) => {
  const { lang, translations } = useLang()
  const deleteItem = useRemoveFromCart()
  const { count, setCount } = useCartItemAction(item)

  return (
    <>
      <DeleteItemBtn
        btnDisabled={false}
        callback={() => deleteItem.mutate({ id: item._id })}
      />
      <div className='card_cart_item_img'>
        <Image src={item.image} alt={item.image} width={136} height={136} />
      </div>
      <div className='card_cart_item_content'>
        <div className='card_cart_item_content_left'>
          <Link
            href={`/catalog/${item.category}/${item.productId}`}
            className='card_cart_item_title'
          >
            <h3>
              {item.name} | {item.characteristics?.authors}
            </h3>
          </Link>
          {item.isDiscount ? (
            <h5>
              <span className='card_cart_item_price line_through card_cart_item_discount'>
                {formatPrice(+item.price)}
              </span>
              <span className='card_cart_item_price'>
                {`${formatPrice(+item.price * (1 - +item.isDiscount / 100))}`}
              </span>
            </h5>
          ) : (
            <h5 className='card_cart_item_price'>{formatPrice(+item.price)}</h5>
          )}
        </div>
        <div className='card_cart_item_content_right'>
          <span>{translations[lang].other.qty}:</span>
          <ProductCounter
            className='card_cart_item_counter'
            count={count}
            setCount={setCount}
            cartItem={item}
            updateCountAsync
          />
        </div>
      </div>
    </>
  )
}

export default CartPopupItem