import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import {
  setTypesOptions,
  setTypes,
  updateTypesOptionByType,
} from '@/context/catalog'
import { useLang } from './useLang'
import { getCheckedArrayParam, getSearchParamsUrl } from '@/lib/utils/common'
import { allowedTypes } from '@/constants/product'
import { $types, $typesOptions } from '@/context/catalog/state'

export const useTypeFilter = (
  handleApplyFiltersWithTypes: (arg0: string[]) => void
) => {
  const { lang } = useLang()
  const typesOptions = useUnit($typesOptions)
  const types = useUnit($types)

  const applyTypes = (types: string[]) => {
    handleApplyFiltersWithTypes(types)
    setTypes(types)
  }

  const handleSelectType = (id: number) => {
    const updatedOptions = typesOptions.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )

    setTypesOptions(updatedOptions)

    const currentOption = updatedOptions.find((item) => item.id === id)

    if (currentOption && currentOption.checked) {
      applyTypes([...types, currentOption.type])
      return
    }

    applyTypes(types.filter((type) => type !== currentOption?.type))
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
