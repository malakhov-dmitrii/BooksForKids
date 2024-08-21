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
<<<<<<< HEAD
 
export default HomePage;

=======

export default HomePage
>>>>>>> 3fa0bfdc0e80713bfc7d5c130f2b42781be631e5
