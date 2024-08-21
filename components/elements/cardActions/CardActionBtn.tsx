import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { IAmCardActionBtnProps } from '@/types/elements'
import styles from '@/styles/cardActionBtn/index.module.css'

const CardActionBtn = ({
  text,
  callback,
  iconClass,
  withTooltip = true,
}: IAmCardActionBtnProps) => {
  const [open, setOpen] = useState(false)
  const [tooltipTop, setTooltipTop] = useState(0)
  const showTooltip = () => setOpen(true)
  const hideTooltip = () => setOpen(false)
  const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>

  // useEffect(() => {
  //     if (open && withTooltip) {
  //       setTooltipTop(tooltipRef.current.clientHeight)
  //     }
  //   }, [open, withTooltip])

  return (
    <div className={styles.actions}>
      <button
        className={`${styles.actions_btn} ${styles[iconClass]}`}
        onClick={callback}
        /*    onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip} */
      ></button>
      {/* {open && <Tooltip text={text} />} */}
    </div>
  )
}

export default CardActionBtn