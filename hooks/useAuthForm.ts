import { EventCallable, Store } from 'effector';
// import { useEffect } from 'react';
// import { useEarthoOne } from '@eartho/one-client-react';
import { useForm } from 'react-hook-form';
import { IAmInput, IAmSignUpFx } from '@/types/authPopup';


export const useAuthForm = (
    event: EventCallable<IAmSignUpFx>
  ) => {
    // const { isConnected, user, connectWithPopup } = useEarthoOne()

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm<IAmInput>()

      // useEffect(() => {
      //     if (isConnected && user) {
      //       console.log(user);
      //       event({
      //         name: user.displayName,
      //         email: user.email,
      //         password: user.uid,
      //         isOAuth: true,
      //       })
      //     }
      // }, [isConnected])

      // const handleSignupWithOAuth =() => {}
      // connectWithPopup({
      //   accessId: `${process.env.NEXT_PUBLIC_OAUTH_ACCESS_ID}`,
      // })

      return {
        register,
        errors,
        handleSubmit,
        // handleSignupWithOAuth,
      }
  }