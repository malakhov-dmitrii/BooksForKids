export interface IAmProductPageProps {
    productId: string
    category: string
}

export interface IAmProductImagesItemProps {
    image: {
      src: string
      alt: string
      id: string
    }
    imgSize: number
  }