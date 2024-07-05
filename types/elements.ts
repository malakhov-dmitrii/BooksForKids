export interface IAmCardActionBtnProps {
    text: string
    iconClass: string
    callback?: (param: any) => void
    withTooltip?: boolean
}

export interface IAmItemsCountProps {
    count: number
}

export interface IAmNotifyOfDeliveryBtnProps {
    text: string
    className?: string
    btnDisabled?: boolean
    handleNotifyMe: (param: any) => void
  }

  export interface IAmViewAllLinkProps {
    href: string
  }
  