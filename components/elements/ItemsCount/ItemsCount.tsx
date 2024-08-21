import { useLang } from '@/hooks/useLang'
import { showCountMessage } from '@/lib/utils/common'
import { IAmItemsCountProps } from '@/types/elements'

const ItemsCount = ({ count }: IAmItemsCountProps) => {
  const { lang, translations } = useLang()

  return (
    <div>
      {count} {showCountMessage(`${count}`, lang)}
    </div>
  )
}

export default ItemsCount