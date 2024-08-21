import { notFound } from 'next/navigation'
import { productCategories } from '@/constants/product'
import ProductsPage from '@/components/templates/productsPage/ProductsPage'

export default function /*Product*/ Category({
  params,
}: {
  params: { /*productId: string;*/ category: string }
}) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  // return <ProductPage productId={params.productId} category={params.category} />
  return <ProductsPage searchParams={params || {}} pageName='catalog' />
}
