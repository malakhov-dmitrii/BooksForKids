'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'
import { onNotifySuccess } from '@/lib/utils/auth'
import { IAmNotifyMeFx } from '@/types/authPopup'
import api from '@/api/apiInstance'

export const notify = createDomain()

export const handleNotifyMe = notify.createEvent<IAmNotifyMeFx>()

export const notifyMeFx = createEffect(
    async ({phone, email, name }: IAmNotifyMeFx) => {

        const { data } = await api.post('/api/users/notify', {
            phone,
            email,
            name,
        })

        if (data.warningMessage) {
            toast.error(data.warningMessage)
            return
        }

        onNotifySuccess('You will be notified when the item is in stock!', data)

        return data
    }
)