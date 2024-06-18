import { useUnit } from "effector-react";
import HomePageSection from "./HomePageSection";
import { $homePageGoods } from "@/context/goods";

const HomePageGoods = () => {
    const goods = useUnit($homePageGoods)
    
    return ( 
       <HomePageSection
       goods={goods}
       />
     );
}
 
export default HomePageGoods;