import { sample } from 'effector'
import { handleNotifyMe, notifyMeFx } from '.'
import { $notify } from './state'

sample({
    clock: handleNotifyMe,
    source: $notify,
    fn: (_, { phone, email, name }) => ({
      phone,
      email,
      name,
    }),
    target: notifyMeFx,
  })
  