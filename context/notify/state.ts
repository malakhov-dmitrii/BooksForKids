'use client'

import toast from 'react-hot-toast'
import { notify, notifyMeFx } from '.'

export const $notify = notify
.createStore({})
.on(notifyMeFx.done, (_, { result }) => result)
.on(notifyMeFx.fail, (_, { error }) => {
toast.error(error.message)
})
