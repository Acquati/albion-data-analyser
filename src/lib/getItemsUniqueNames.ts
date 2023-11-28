import { Item } from '@/types/Item'

const getItemsUniqueNames = (items: Item[] | null): (string | null)[] => {
  if (items === null) {
    return [null]
  }

  const uniqueNamesSet = new Set<string>()

  const uniqueNames = items
    .map((item) => {
      if (!uniqueNamesSet.has(item.uniqueName)) {
        uniqueNamesSet.add(item.uniqueName)
        return item.uniqueName
      }
      return null
    })
    .filter((item) => item !== null)

  return uniqueNames
}

export default getItemsUniqueNames
