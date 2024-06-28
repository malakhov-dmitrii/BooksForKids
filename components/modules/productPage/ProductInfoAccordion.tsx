import { IAmProductInfoAccordionProps } from '@/types/product'
import styles from '@/styles/product/index.module.css'
import Accordion from './Accordion'

const ProductInfoAccordion = ({
  children,
  title,
}: IAmProductInfoAccordionProps) => (
  <Accordion
    title={`${title}:`}
    titleClass={styles.product_middle_description_btn}
    rotateIconClass={styles.expanded}
  >
    {children}
  </Accordion>
)

export default ProductInfoAccordion
