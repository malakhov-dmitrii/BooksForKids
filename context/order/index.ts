import { IAmOrderDetailsValues } from "@/types/order"
import { createDomain } from "effector"

export const order = createDomain()

export const setOrderDetailsValues = order.createEvent<IAmOrderDetailsValues>()