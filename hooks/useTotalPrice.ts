import { useUnit } from "effector-react"
import { useEffect } from "react"
import { useGoodsByAuth } from "./useGoodsByAuth"
import { $cart, $cartFromLs, $totalPrice } from "@/context/cart/state"

export const useTotalPrice = () => {
    const totalPrice = useUnit($totalPrice)
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);

    const getNewTotal = () =>
    currentCartByAuth
      .map((item) => +item.price * +item.count)
      .reduce((defaultCount, item) => defaultCount + item, 0)

    const newTotal = getNewTotal();

    // useEffect(() => {
    //   setTotalPrice(getNewTotal())
    // }, [currentCartByAuth])
   return { newTotal }
}