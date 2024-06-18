export type SearchParams = { [key: string]: string | string[] | undefined }

export interface IAmProductsPage {
  searchParams: SearchParams
  pageName: string
}

export interface IAmCatalogCategoryOptions {
  rootCategoryOptions?: {
    id: number
    title: string
    href: string
  }[]
  russianBooksCategoryOptions?: IAmCategoryOption[]
}

export interface IAmCategoryOption {
  id: number
  title: string
  filterHandler: VoidFunction
}

// export interface ICategoryFilterListProps {
//   handleSelectAllCategories: VoidFunction
//   currentOptions: ICategoryOption[]
//   option: string
//   setOption: (arg0: string) => void
//   allCategoriesTitle: string
//   catalogCategoryOptions: ICatalogCategoryOptions
//   mobileClassName?: string
// }

export interface IAmSelectItemProps {
  item: IAmCategoryOption
  isActive: boolean
  setOption: (arg0: string) => void
  mobileClassName?: string
}

export interface IAmSelectBtnProps {
  open: boolean
  toggle: VoidFunction
  dynamicText: string
  defaultText: string
}

export interface IAmCatalogFiltersProps {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
  handleApplyFiltersWithTypes: (types: string[]) => void
  // handleApplyFiltersWithColors: (sizes: string[]) => void
  handleApplyFiltersBySort: (arg0: string) => void
  handleApplyFilterOnSale: (types: string[]) => void
  handleApplyFilterInStock: (types: string[]) => void
}

export interface IAmTypeOption {
  id: number
  type: string
  checked: boolean
}

export interface IAmCheckboxSelectItemProps {
  callback: (arg0: number) => void
  item: {
    id: number
    type?: string
    checked: boolean
  }
  mobileClassName?: string
}

// export interface IColorOption {
//   id: number
//   colorCode: string
//   checked: boolean
//   colorText: string
// }

// export interface ISelectInfoItem {
//   text: string
//   handleRemoveItem: (arg0: number) => void
//   id: number
// }

export interface IAmCheckFilterBtnProps {
  callback: (param: any) => void
  className?: string
  btnText: string
}

export interface IAmFilterBtnProps {
  callback: (param: any) => void
  className?: string
}
