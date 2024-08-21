import Link from 'next/link'
import React from 'react'
import { IAmShopPopupLinkItemProps } from '@/types/modules'

const ShopPopupLinkItem = ({
  item,
  // handleRedirect,
}: IAmShopPopupLinkItemProps) => {

  return (
    <li key={item.id} className='shop_popup_item'>
      <Link
        href={item.href}
        className='shop_popup_item_link'
      >
        {item.text}
      </Link>
    </li>
  )
}

export default ShopPopupLinkItem
