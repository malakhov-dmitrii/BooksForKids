import { EventCallable, Store } from 'effector';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IAmInput, IAmSignUpFx } from '@/types/authPopup';


export const useAuthForm = (
    event: EventCallable<IAmSignUpFx>
  ) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm<IAmInput>()

      return {
        register,
        errors,
        handleSubmit,
      }
  }