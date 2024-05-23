import { useState } from "react";
import { IAmCartItem } from "@/types/cart";
import { usePriceAction } from "./usePriceAction";
import { deleteProductFromLS, isUserAuth } from "@/lib/utils/common";
import { deleteProductFromCart, setCartFromLS, setShouldShowEmpty } from "@/context/cart";

export const useCartItemAction = (cartItem: IAmCartItem) => {
    const [count, setCount] = useState(+cartItem.count)
    const { price, increasePrice, decreasePrice } = usePriceAction(
        +cartItem.count,
        +cartItem.price
    )

    const handleDeleteCartItem = () => {
        if (!isUserAuth()) {
          deleteProductFromLS(
            cartItem.clientId,
            'cart',
            setCartFromLS,
            setShouldShowEmpty,
            'Removed from the cart'
          )
          return
        }
    
        const auth = JSON.parse(localStorage.getItem('auth') as string)
    
        deleteProductFromLS(
          cartItem.clientId,
          'cart',
          setCartFromLS,
          setShouldShowEmpty,
          '',
          false,
        )
        deleteProductFromCart({
          jwt: auth.accessToken,
          id: cartItem._id,
        })
      }

    return {
        price,
        count,
        setCount,
        increasePrice,
        decreasePrice,
        handleDeleteCartItem,
    }
}

