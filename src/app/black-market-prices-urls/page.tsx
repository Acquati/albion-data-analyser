'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'

const Page = () => {
  const [data, setData] = useState<(string | null)[]>([])
  const marketNames = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Generate URLs" button to be pressed.'
  )

  const handleClick = async () => {
    let uniqueNames: (string | null)[] = []

    uniqueNames = items
      .map((item) => {
        if (!uniqueNames.includes(item.uniqueName)) {
          return item.uniqueName
        }
        return null
      })
      .filter((item) => item !== null)

    // const concatenatedUniqueNames = uniqueNames.join('%2C') // 285525
    // console.log(concatenatedUniqueNames.length)

    const APIHostURL = 'https://west.albion-online-data.com'
    const pricesEndpoint = '/api/v2/stats/Prices/'
    const format = '.json'
    const locations = '?locations=' + marketNames.join('%2C')
    // 0 = all the qualities, 1 to 5 specific quality
    const qualities = '&qualities=' + '0'
    const requestInfoWithoutItemList = APIHostURL + pricesEndpoint + format + locations + qualities // 95
    const maxRequestInfoLength = 4096
    const maxItemListLength = maxRequestInfoLength - requestInfoWithoutItemList.length // 4096 - 95 = 4001

    const requestInfoList: (string | null)[] = []
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

    setData(requestInfoList)

    setResponseFeedback('URLs generated successfully.')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market Prices URLs</h1>
      <p>Generate the list of URLs to request all the prices of the items on the "Black Market".</p>
      <Button onClick={handleClick}>Generate URLs</Button>
      <p>{responseFeedback}</p>

      {data &&
        data.map((item, index) => (
          <p className="break-all" key={index}>
            <a
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              href={String(item)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item}
            </a>
          </p>
        ))}
    </div>
  )
}

export default Page
