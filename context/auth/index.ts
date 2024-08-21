'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'
import { onAuthSuccess } from '@/lib/utils/auth'
import { IAmSignUpFx } from '@/types/authPopup'
import api from '@/api/apiInstance'

export const auth = createDomain()

export const handleSignUp = auth.createEvent<IAmSignUpFx>()
export const handleSignIn = auth.createEvent<IAmSignUpFx>()
export const setIsAuth = auth.createEvent<boolean>()

export const signUpFx = createEffect(
    async ({ name, password, email }: IAmSignUpFx) => {

        const { data } = await api.post('/api/users/signup', {
            name,
            password,
            email,
        })

        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }

        onAuthSuccess('You are registered!', data)

        return data
    }
)

export const signInFx = createEffect(async ({ email, password }: IAmSignUpFx) => {

    const { data } = await api.post('/api/users/login', { email, password })

    if (data.warningMessage) {
        toast.error(data.warningMessage)
        return
    }

    onAuthSuccess('You are logged in!', data)

    return data
})

export const refreshTokenFx = createEffect(async ({ jwt }: { jwt: string }) => {
    const { data } = await api.post('/api/users/refresh', { jwt })
  
    localStorage.setItem('auth', JSON.stringify(data))
  
    return data
  })
