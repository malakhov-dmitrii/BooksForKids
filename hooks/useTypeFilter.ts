import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { useLang } from './useLang'
import { getCheckedArrayParam, getSearchParamsUrl } from '@/lib/utils/common'
import { allowedTypes } from '@/constants/product'

export const useTypeFilter = (
  handleApplyFiltersWithTypes: (arg0: string[]) => void
) => {
  const { lang, translations } = useLang()
  const [types, setTypes] = useState<string[]>([])
  const [typesOptions, setTypesOptions] = useState([
    {
      value: 'learnLetters',
      title: translations[lang].catalog.learnLetters,
      checked: false,
    },
    {
      value: 'readMyself',
      title: translations[lang].catalog.readMyself,
      checked: false,
    },
    {
      value: 'bedTimeStories',
      title: translations[lang].catalog.bedTimeStories,
      checked: false,
    },
  ])
  // const types = useUnit($types)

  const updateTypesOptionByType = (type: string) => {
    setTypesOptions(
      typesOptions.map((item) => ({
        ...item,
        checked: item.value === type,
      }))
    )
  }

  const applyTypes = (types: string[]) => {
    handleApplyFiltersWithTypes(types)
    setTypes(types)
  }

  const handleSelectType = (value: string) => {
    const updatedOptions = typesOptions.map((item) =>
      item.value === value ? { ...item, checked: !item.checked } : item
    )

    setTypesOptions(updatedOptions)

    const currentOption = updatedOptions.find((item) => item.value === value)

    if (currentOption && currentOption.checked) {
      applyTypes([...types, currentOption.value])
      return
    }

    applyTypes(types.filter((type) => type !== currentOption?.value))
  }

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const typesParam = urlParams.get('types')

    if (typesParam) {
      const validTypes = getCheckedArrayParam(typesParam)

      if (
        validTypes &&
        validTypes.every((type) => allowedTypes.includes(type.toLowerCase()))
      ) {
        applyTypes(validTypes)
        validTypes.forEach((type) => updateTypesOptionByType(type))
      }

      return
    }

    setTypes([])
    setTypesOptions(
      typesOptions.map((option) => ({ ...option, checked: false }))
    )
  }, [lang])

  return { handleSelectType, typesOptions, types }
}
