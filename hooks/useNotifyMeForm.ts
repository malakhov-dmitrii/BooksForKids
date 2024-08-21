import { EventCallable} from 'effector';
import { useForm } from 'react-hook-form';
import { IAmInput, IAmNotifyMeFx } from '@/types/authPopup';


export const useNotifyMeForm = (
    event: EventCallable<IAmNotifyMeFx>
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