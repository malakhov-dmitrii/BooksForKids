import { FieldErrors, FieldErrorsImpl, UseFormRegister } from "react-hook-form"

export interface IAmInput {
    name: string
    email: string
    password: string
    phone?: string
}

export interface IAmSignUpFx {
    name?: string
    email: string
    password: string
    isOAuth?: boolean
}

export interface IAmAuthInput {
    register: UseFormRegister<IAmInput>
    errors: Partial<FieldErrorsImpl<IAmInput>>
  }

export interface IAmNameErrorMessageProps {
    errors: FieldErrors<IAmInput & { [index: string]: string }>
    fieldName: string
    className?: string
}

export interface IAmNotifyMeFx {
    phone: string
    name: string
    email: string
}