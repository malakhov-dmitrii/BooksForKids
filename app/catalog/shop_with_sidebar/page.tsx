import ProductsPageShopWithSidebar from '@/components/templates/productsPageShopWithSidebar/ProductsPageShopWithSidebar'
import { SearchParams } from '@/types/catalog'

export default function ShopWithSidebar({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  return (
    <ProductsPageShopWithSidebar
      searchParams={searchParams || {}}
      pageName='catalog/shop_with_sidebar'
    />
  )
}
