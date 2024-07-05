'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { loadOneProduct } from '@/context/goods'
import { IAmProductPageProps } from '@/types/product'
import { useLang } from '@/hooks/useLang'
import ProductPageContent from '@/components/modules/productPage/ProductPageContent'
import styles from '@/styles/product/index.module.css'
import { $currentProduct } from '@/context/goods/state'

const ProductPage = ({ productId, category }: IAmProductPageProps) => {
  const product = useUnit($currentProduct)
  const { lang, translations } = useLang()

  useEffect(() => {
    loadOneProduct({
      productId,
      category,
    })
  }, [])

  if (product?.errorMessage) {
    notFound()
  }

  return (
    <div className={`${styles.product}`}>
      <ProductPageContent />
    </div>
  )
}

export default ProductPage