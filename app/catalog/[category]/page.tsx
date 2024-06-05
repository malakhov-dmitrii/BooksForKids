import { notFound } from 'next/navigation'
import { productCategories } from '@/constants/product'

export default function /*Product*/ Category({
  params,
}: {
  params: { /*productId: string;*/ category: string }
}) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }

  // return <ProductPage productId={params.productId} category={params.category} />
  return <h1>{params.category}</h1>
}
