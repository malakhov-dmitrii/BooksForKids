import { useUnit } from "effector-react"
import { useEffect } from "react"
import { useGoodsByAuth } from "./useGoodsByAuth"
import { $cart, $cartFromLs, $totalPrice } from "@/context/cart/state"

export const useTotalPriceWithDiscount = () => {
    const totalPriceWithDiscount = useUnit($totalPrice)
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);

    const getNewTotalWithDiscount = (  ) =>
    currentCartByAuth
      .map((item) => (+item.isDiscount) ? +item.price * +item.count * (1 - (+item.isDiscount)/100) : +item.price * +item.count)
      .reduce((defaultCount, item) => defaultCount + item, 0)

    const newTotalWithDiscount = getNewTotalWithDiscount();

   return { newTotalWithDiscount }
}