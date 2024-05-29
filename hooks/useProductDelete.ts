import { EventCallable } from 'effector'
import { useState } from 'react'
import { IAmBaseEffectProps } from '@/types/common'

export const useProductDelete = (
  id: string,
  deleteEvent: EventCallable<IAmBaseEffectProps>
) => {

  const handleDelete = () => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    deleteEvent({
      jwt: auth.accessToken,
      id,
    })
  }

  return { handleDelete }
}
