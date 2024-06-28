import Image from 'next/image'
import { IAmProductImagesItemProps } from '@/types/product'
import styles from '@/styles/product/index.module.css'

const ProductImagesItem = ({ image, imgSize }: IAmProductImagesItemProps) => {

  return (
    <li
      className={styles.product_top_images_item}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={imgSize}
        height={imgSize}
        // className='transition-opacity opacity-0 duration'
        // onLoad={handleLoadingImageComplete}
      />
    </li>
  )
}

export default ProductImagesItem