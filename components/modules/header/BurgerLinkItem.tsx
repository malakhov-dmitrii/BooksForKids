import Link from 'next/link'
import React from 'react'
import { IAmBurgerLinkItemProps } from '@/types/modules'

const BurgerLinkItem = ({
  item,
}: IAmBurgerLinkItemProps) => {

  return (
    <li key={item.id} className='nav_burger_list_item'>
      <h3>
        <Link
          href={item.href}
          className='burger_link'
        >
          {item.text}
        </Link>
      </h3>
    </li>
  )
}

export default BurgerLinkItem
