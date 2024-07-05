'use client'
import {
  IAmCatalogCategoryOptions,
  IAmTypeOption,
} from '@/types/catalog'
import { catalog, setCatalogCategoryOptions, setTypes, setTypesOptions, updateTypesOptionByType } from '.'

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
