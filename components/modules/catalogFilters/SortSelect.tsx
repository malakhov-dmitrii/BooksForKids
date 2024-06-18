import { useEffect, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import SelectBtn from './SelectBtn'
import SelectItem from './SelectItem'
import { getSearchParamsUrl } from '@/lib/utils/common'
import styles from '@/styles/filters/index.module.css'

const SortSelect = ({
  handleApplyFiltersBySort,
}: {
  handleApplyFiltersBySort: (arg0: string) => void
}) => {
  const { lang, translations } = useLang()
  const { open, ref, toggle } = useClickOutside()
  const [option, setOption] = useState('')

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sortParam = urlParams.get('sort')

    if (sortParam) {
      const paramOption = (
        translations[lang].catalog as { [index: string]: string }
      )[sortParam]

      if (paramOption) {
        setOption(paramOption)
        handleApplyFiltersBySort(sortParam)
      }
    }
  }, [lang])

  const sortOptions = [
    {
      id: 1,
      title: translations[lang].catalog.bestseller,
      filterHandler: () => handleApplyFiltersBySort('bestseller'),
    },
    {
      id: 2,
      title: translations[lang].catalog.new,
      filterHandler: () => handleApplyFiltersBySort('new'),
    },
    {
      id: 3,
      title: translations[lang].catalog.cheap_first,
      filterHandler: () => handleApplyFiltersBySort('cheap_first'),
    },
    {
      id: 4,
      title: translations[lang].catalog.expensive_first,
      filterHandler: () => handleApplyFiltersBySort('expensive_first'),
    },
    {
      id: 5,
      title: translations[lang].catalog.higher_raiting,
      filterHandler: () => handleApplyFiltersBySort('higher_raiting'),
    },
  ]

  return (
    <div
      className={`body_medium ${styles.catalog_filters_select} ${styles.catalog_filters_select_sort}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.sort}
        dynamicText={option}
      />
      {open && (
        <ul
          className={`${styles.catalog_filters_list}`}
        >
          {sortOptions.map((item) => (
            <SelectItem
              key={item.id}
              item={item}
              setOption={setOption}
              isActive={item.title === option}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default SortSelect
