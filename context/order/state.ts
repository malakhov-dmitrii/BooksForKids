'use client'

import { IAmOrderDetailsValues } from "@/types/order"
import { order, setOrderDetailsValues } from "."

export const $orderDetailsValues = order
  .createStore<IAmOrderDetailsValues>({} as IAmOrderDetailsValues)
  .on(setOrderDetailsValues, (_, value) => value)