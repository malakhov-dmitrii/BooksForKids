export const countWholeCartItemsAmount = (cart: { count: number }[]) =>
  cart.reduce((defaultCount, item) => defaultCount + +(item.count ?? 1), 0)
