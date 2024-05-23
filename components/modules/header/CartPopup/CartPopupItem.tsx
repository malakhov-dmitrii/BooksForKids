import DeleteCartItemBtn from '@/components/elements/deleteCartItemBtn/DeleteCartItemBtn';
import { useCartItemAction } from '@/hooks/useCartItemAction';
import { IAmCartItem } from '@/types/cart';
import Image from 'next/image'
import { useLang } from "@/hooks/useLang";
import Link from 'next/link';
import { formatPrice } from '@/lib/utils/common';
import ProductCounter from '../../card/ProductCounter';

const CartPopupItem = ({item}: {item: IAmCartItem}) => {
    const { lang, translations } = useLang();
    const {
        price,
        count,
        setCount,
        increasePrice,
        decreasePrice,
        handleDeleteCartItem,
    } = useCartItemAction(item)
    
    return (
        <>
        <DeleteCartItemBtn 
        btnDisabled={false} 
        callback={handleDeleteCartItem} />
        <div className='card_cart_item_img'>
            <Image src={item.image} alt={item.image} width={136} height={136} />
        </div>
        <div className='card_cart_item_content'>
            <div className='card_cart_item_content_left'>
            <Link href={`/catalog/${item.category}/${item.productId}`} className='card_cart_item_title'>
                <h3>
                    {item.name} | {item.authors}
                </h3>
            </Link>
            {item.isDiscount
              ? <h5>
                <span className='price card_cart_item_price line_through card_cart_item_discount'>{formatPrice(+item.price)}</span>
                <span className='price card_cart_item_price'>{`${formatPrice(+item.price * (1 - (+item.isDiscount)/100))}`}</span> 
              </h5>
              : <h5 className='price card_cart_item_price'>
              {formatPrice(+item.price)}
              </h5>
            }
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
    );
};

export default CartPopupItem;