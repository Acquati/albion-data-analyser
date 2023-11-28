import { MarketItem } from '@/types/MarketItem'

const getMarketItemsUniqueNames = (marketItems: MarketItem[] | null): (string | null)[] => {
  if (marketItems === null) {
    return [null]
  }

  const uniqueNamesSet = new Set<string>()

  const uniqueNames = marketItems
    .map((item) => {
      if (!uniqueNamesSet.has(item.item_id)) {
        uniqueNamesSet.add(item.item_id)
        return item.item_id
      }
      return null
    })
    .filter((item) => item !== null)

  return uniqueNames
}

export default getMarketItemsUniqueNames
