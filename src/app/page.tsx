'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'
import generateApiRequests from '@/lib/generateApiRequests'
import fetchMarketData from '@/lib/fetchMarketData'
import { MarketItem } from '@/types/MarketItem'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'

const Page = () => {
  const marketNames = ['Black%20Market']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Generate URLs" button to be pressed.'
  )

  const handleClick = async () => {
    const requestInfoList = generateApiRequests(items, marketNames, setResponseFeedback)

    let blackMarketPrices: MarketItem[] | null = null
    if (requestInfoList !== null) {
      blackMarketPrices = await fetchMarketData(requestInfoList, setResponseFeedback)
    }

    let validBlackMarketPrices: MarketItem[] | null = null
    if (blackMarketPrices !== null) {
      validBlackMarketPrices = blackMarketPrices.filter(
        (item) => item.buy_price_max !== 0 || item.buy_price_min !== 0
      )
    }

    let completeBlackMarketPrices: CompleteMarketItem[] = []
    if (validBlackMarketPrices !== null) {
      completeBlackMarketPrices = validBlackMarketPrices.map(({ item_id, ...value }) => {
        const foundItem = items.find((item) => item.uniqueName === item_id)

        return {
          ...value,
          item_id,
          name: foundItem?.name,
          description: foundItem?.description,
        }
      })
    }

    const blackMarketItemsNames = completeBlackMarketPrices.map((item) => item.item_id)

    console.log(blackMarketItemsNames)
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
