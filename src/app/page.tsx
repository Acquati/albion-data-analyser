'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'

const Page = () => {
  // const items = ['T8_BAG']
  const marketNames = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API Call" button to be pressed.'
  )

  const handleClick = async () => {
    // const data = await getPrices({ items, marketNames, setResponseFeedback })
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
    // const itemList = uniqueNames.join('%2C')
    const format = '.json'
    const locations = '?locations=' + marketNames.join('%2C')
    // 0 = all the qualities, 1 to 5 specific quality
    const qualities = '&qualities=' + '0'
    const requestInfoWithoutItemList = APIHostURL + pricesEndpoint + format + locations + qualities // 4096 - 95 = 4001
    const maxRequestInfoLength = 4096
    const maxItemListLength = maxRequestInfoLength - requestInfoWithoutItemList.length

    const requestInfoList: (string | null)[] = []
    let uniqueNameList = ''
    let requestInfo = ''

    for (const uniqueName of uniqueNames) {
      if (uniqueNameList.length === 0) {
        uniqueNameList += uniqueName
      } else {
        uniqueNameList += '%2C' + uniqueName
      }
    }

    const APIEndpoint = pricesEndpoint + uniqueNameList + format + locations + qualities
    requestInfo = APIHostURL + APIEndpoint
    requestInfoList.push(requestInfo)

    console.log(requestInfoList)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Albion Data Analyser</h1>
      <p>Markets items prices test.</p>
      <Button onClick={handleClick}>Make API Call</Button>
      <p>{responseFeedback}</p>
    </div>
  )
}

export default Page
