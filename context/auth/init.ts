import { sample } from 'effector'
import { handleSignUp, handleSignIn, signUpFx, signInFx,} from '.'
import { $auth } from './state'

sample({
    clock: handleSignUp,
    source: $auth,
    fn: (_, { name, email, password }) => ({
      name,
      password,
      email,
    }),
    target: signUpFx,
  })
  
  sample({
    clock: handleSignIn,
    source: $auth,
    fn: (_, { email, password, name }) => ({
      email,
      password,
      name,
    }),
    target: signInFx,
  })
