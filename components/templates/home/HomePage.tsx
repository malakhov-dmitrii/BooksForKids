'use client'
import { useGate } from 'effector-react'
import HomeSlider from '@/components/modules/home/HomeSlider'
import HomePageGoods from '@/components/modules/home/HomePageGoods'
import { HomePageGate } from '@/context/goods'

const HomePage = () => {
  useGate(HomePageGate)

  return (
    <main>
      <HomeSlider />
      <HomePageGoods />
    </main>
  )
}

export default HomePage
