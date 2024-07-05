import { sample } from 'effector'
import { handleSignUp, handleSignIn, signUpFx, signInFx,} from '.'
import { $auth } from './state'

sample({
    clock: handleSignUp,
    source: $auth,
    fn: (_, { name, email, password, /*isOAuth*/ }) => ({
      name,
      password,
      email,
    //   isOAuth,
    }),
    target: signUpFx,
  })
  
  sample({
    clock: handleSignIn,
    source: $auth,
    fn: (_, { email, password, /*isOAuth, */name }) => ({
      email,
      password,
    //   isOAuth,
      name,
    }),
    target: signInFx,
  })
