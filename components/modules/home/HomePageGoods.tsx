import { useUnit } from "effector-react";
import { useLang } from "@/hooks/useLang";
import HomePageSection from "./HomePageSection";
import { $homePageGoods } from "@/context/goods";

const HomePageGoods = () => {
    const goods = useUnit($homePageGoods)
    const { lang, translations } = useLang()
    
    return ( 
       <HomePageSection
       goods={goods}
       />
     );
}
 
export default HomePageGoods;