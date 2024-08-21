import ProductsPageShopFullWidth from '@/components/templates/productsPageShopFullWidth/ProductsPageShopFullWidth'
import { SearchParams } from '@/types/catalog'

export default function ShopFullWidth({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return <ProductsPageShopFullWidth searchParams={searchParams || {}} pageName='catalog/shop_full_width' />
}