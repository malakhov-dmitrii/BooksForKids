'use client'
import { createDomain } from 'effector'
import {
  IAmCatalogCategoryOptions,
  IAmTypeOption,
//   IColorOption,
} from '@/types/catalog'

export const catalog = createDomain()

export const setCatalogCategoryOptions =
  catalog.createEvent<Partial<IAmCatalogCategoryOptions>>()
export const setTypesOptions = catalog.createEvent<IAmTypeOption[]>()
// export const setColorsOptions = catalog.createEvent<IColorOption[]>()
export const updateTypesOptionByType = catalog.createEvent<string>()
// export const updateColorsOptionByCode = catalog.createEvent<string>()
// export const setColors = catalog.createEvent<string[]>()
export const setTypes = catalog.createEvent<string[]>()
export const setIsDiscount = catalog.createEvent<string[]>()
// export const setFiltersPopup = catalog.createEvent<boolean>()

export const $catalogCategoryOptions = catalog
  .createStore<IAmCatalogCategoryOptions>({})
  .on(setCatalogCategoryOptions, (_, options) => ({ ...options }))

export const $typesOptions = catalog
  .createStore<IAmTypeOption[]>([
    { id: 1, type: 'learnLetters', checked: false },
    { id: 2, type: 'readMyself', checked: false },
    { id: 3, type: 'bedTimeStories', checked: false },
  ])
  .on(setTypesOptions, (_, options) => options)
  .on(updateTypesOptionByType, (state, type) =>
    state.map((item) =>
      item.type === type ? { ...item, checked: true } : item
    )
  )

export const $types = catalog
  .createStore<string[]>([])
  .on(setTypes, (_, types) => types)
