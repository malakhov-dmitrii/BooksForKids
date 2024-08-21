import { useCartAction } from "@/hooks/useCartAction";

const SKU = () => {
    const { product } = useCartAction() 
    return (
    <h5 className="sku_container">SKU: <span className="sku">{product.vendorCode}</span></h5>
    )
} 

export default SKU;