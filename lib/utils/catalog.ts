export const getCheckedPriceFrom = (price: number) =>
  +price > 200 ? '10' : price

export const getCheckedPriceTo = (price: number) =>
  +price > 200? '200' : price
