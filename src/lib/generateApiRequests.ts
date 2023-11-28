'use client'
import { Item } from '@/types/Item'
import { Dispatch, SetStateAction } from 'react'

const generateApiRequests = (
  items: Item[],
  marketNames: string[],
  setResponseFeedback: Dispatch<SetStateAction<string>>
): string[] | null => {
  let uniqueNames: (string | null)[] = []

  uniqueNames = items
    .map((item) => {
      if (!uniqueNames.includes(item.uniqueName)) {
        return item.uniqueName
      }
      return null
    })
    .filter((item) => item !== null)

  const APIHostURL = 'https://west.albion-online-data.com'
  const pricesEndpoint = '/api/v2/stats/Prices/'
  const format = '.json'
  const locations = '?locations=' + marketNames.join('%2C')
  // 0 = all the qualities, 1 to 5 specific quality
  const qualities = '&qualities=' + '0'
  const requestInfoWithoutItemList = APIHostURL + pricesEndpoint + format + locations + qualities
  const maxRequestInfoLength = 4096
  const maxItemListLength = maxRequestInfoLength - requestInfoWithoutItemList.length

  const requestInfoList: string[] = []
  let itemList = ''
  let requestInfo = ''
  let APIEndpoint = ''

  for (let i = 0; i < uniqueNames.length; i++) {
    if (itemList.length === 0) {
      itemList += uniqueNames[i]
    } else if ((itemList + '%2C' + uniqueNames[i]).length <= maxItemListLength) {
      itemList += '%2C' + uniqueNames[i]
    } else {
      APIEndpoint = pricesEndpoint + itemList + format + locations + qualities
      requestInfo = APIHostURL + APIEndpoint
      requestInfoList.push(requestInfo)

      itemList = ''
      requestInfo = ''
      APIEndpoint = ''
      i--
    }
  }

  // Check if there are remaining items in itemList.
  if (itemList.length > 0) {
    APIEndpoint = pricesEndpoint + itemList + format + locations + qualities
    requestInfo = APIHostURL + APIEndpoint
    requestInfoList.push(requestInfo)
  }

  if (requestInfoList.length === 0) {
    setResponseFeedback('Request information list length = 0.')

    return null
  } else {
    setResponseFeedback('URLs generated successfully.')

    return requestInfoList.length > 0 ? requestInfoList : null
  }
}

export default generateApiRequests
