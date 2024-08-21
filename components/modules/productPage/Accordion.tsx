import React, { useState } from 'react'
import { IAmAccordionProps } from '@/types/product'

const Accordion = ({
  children,
  title,
  titleClass,
  rotateIconClass,
}: IAmAccordionProps) => {
  const [expanded, setExpanded] = useState(false)

  const toggleAccordion = () => setExpanded(!expanded)

  return (
    <>
      <button
        onClick={toggleAccordion}
        className={`${titleClass} ${
          rotateIconClass ? (expanded ? rotateIconClass : '') : ''
        }`}
      >
        {title}
      </button>
        {expanded && (
          <div
            // key='content'
            // variants={{
            //   open: { opacity: 1, height: 'auto' },
            //   collapsed: { opacity: 0, height: 0 },
            // }}
            // style={{ overflow: 'hidden' }}
            // transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </div>
        )}
    </>
  )
}

export default Accordion