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

export interface IAmProductInfoAccordionProps {
  children: React.ReactNode
  title: string
}

export interface IAmAccordionProps {
  children: React.ReactNode
  title: string | JSX.Element
  titleClass: string
  rotateIconClass?: string
}