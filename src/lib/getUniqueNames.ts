import { MarketItem } from '@/types/MarketItem'

const getUniqueNames = (filteredData: MarketItem[] | null): (string | null)[] => {
  if (filteredData === null) {
    return [null]
  }

  let uniqueNames: (string | null)[] = []

  uniqueNames = filteredData
    .map((item) => {
      if (!uniqueNames.includes(item.item_id)) {
        return item.item_id
      }
      return null
    })
    .filter((item) => item !== null)

  return uniqueNames
}

export default getUniqueNames
