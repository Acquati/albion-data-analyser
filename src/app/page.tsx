'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'
import generateApiRequests from '@/lib/generateApiRequests'
import fetchMarketData from '@/lib/fetchMarketData'
import { arrayBuffer } from 'stream/consumers'

const Page = () => {
  const marketNames = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Generate URLs" button to be pressed.'
  )

  const handleClick = async () => {
    const requestInfoList = generateApiRequests(items, marketNames, setResponseFeedback)
    // console.log(requestInfoList)

    if (requestInfoList !== null) {
      const blackMarketPrices = await fetchMarketData(requestInfoList, setResponseFeedback)

      if (blackMarketPrices !== null) {
        const validBlackMarketPrices = blackMarketPrices.filter(
          (item) => item.buy_price_max !== 0 || item.buy_price_min !== 0
        )

        const completeBlackMarketPrices = validBlackMarketPrices.map((value) => {
          const foundItem = items.find((item) => item.uniqueName === value.item_id)

          return {
            buy_price_max: value.buy_price_max,
            buy_price_max_date: value.buy_price_max_date,
            buy_price_min: value.buy_price_min,
            buy_price_min_date: value.buy_price_min_date,
            city: value.city,
            item_id: value.item_id,
            quality: value.quality,
            sell_price_max: value.sell_price_max,
            sell_price_max_date: value.sell_price_max_date,
            sell_price_min: value.sell_price_min,
            sell_price_min_date: value.sell_price_min_date,
            name: foundItem?.name,
            description: foundItem?.description,
          }
        })

        console.log(completeBlackMarketPrices)
      }
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market Prices URLs</h1>
      <p>Generate the list of URLs to request all the prices of the items on the "Black Market".</p>
      <Button onClick={handleClick}>Generate URLs</Button>
      <p>{responseFeedback}</p>
    </div>
  )
}

export default Page
