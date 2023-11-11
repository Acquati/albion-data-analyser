import { MarketItem } from '@/types/MarketItem'

const getUniqueNames = (filteredData: MarketItem[] | null): (string | null)[] => {
  const uniqueItemIds: String[] = []

  if (filteredData === null) {
    return [null]
  }

  const uniqueNames = filteredData
    .map((item) => {
      if (!uniqueItemIds.includes(item.item_id)) {
        uniqueItemIds.push(item.item_id)
        return item.item_id
      }
      return null
    })
    .filter((item) => item !== null)

  return uniqueNames
}

export default getUniqueNames
