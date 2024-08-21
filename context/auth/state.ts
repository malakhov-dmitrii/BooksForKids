'use client'

import toast from 'react-hot-toast'
import {
  auth,
  setIsAuth,
  signInFx,
  signUpFx,
} from '.'

export const $isAuth = auth
  .createStore(false)
  .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
.createStore({})
.on(signUpFx.done, (_, { result }) => result)
.on(signUpFx.fail, (_, { error }) => {
toast.error(error.message)
})
.on(signInFx.done, (_, { result }) => result)
.on(signInFx.fail, (_, { error }) => {
toast.error(error.message)
})
