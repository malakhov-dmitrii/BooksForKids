import toast from 'react-hot-toast'
import { setIsAuth } from '@/context/auth'

export const onAuthSuccess = <T>(message: string, data: T) => {
  localStorage.setItem('auth', JSON.stringify(data))
  document.location.href = '/my-account/dashboard'
  toast.success(message)
  setIsAuth(true)
}

export const nameValidationRules = (
    message: string,
    requireMessage?: string
  ) => ({
    ...(requireMessage && { required: requireMessage }),
    pattern: {
      value: /^[а-яА-Яa-zA-ZёЁ]*$/,
      message,
    },
    minLength: 2,
    maxLength: 15,
  })
  
  export const emailValidationRules = (
    message: string,
    requireMessage?: string
  ) => ({
    ...(requireMessage && { required: requireMessage }),
    pattern: {
      value: /\S+@\S+\.\S+/,
      message,
    },
  })
  