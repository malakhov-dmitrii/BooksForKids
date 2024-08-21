'use client'
import { createDomain } from 'effector'
import { IAmCatalogCategoryOptions, IAmTypeOption } from '@/types/catalog'

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