'use client'

import { IAmUser } from '@/types/user'
import { loginCheckFx, user } from '.'

export const $user = user
  .createStore<IAmUser>({} as IAmUser)
  .on(loginCheckFx.done, (_, { result }) => result)
