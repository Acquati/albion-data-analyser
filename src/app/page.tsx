'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'
import generateApiRequests from '@/lib/generateApiRequests'
import fetchMarketData from '@/lib/fetchMarketData'
import { MarketItem } from '@/types/MarketItem'
import getItemsUniqueNames from '@/lib/getItemsUniqueNames'
import getMarketItemsUniqueNames from '@/lib/getMarketItemsUniqueNames copy'

const Page = () => {
  const [blackMarketResponseFeedback, setBlackMarketResponseFeedback] = useState(
    'Waiting for "Request Black Market Items" button to be pressed.'
  )
  const [fortSterlingResponseFeedback, setFortSterlingResponseFeedback] = useState(
    'Waiting for "Request Black Market Items" button to be pressed.'
  )

  const handleClick = async () => {
    setFortSterlingResponseFeedback('Waiting for Black Market Items to be fetched.')

    const uniqueNames = getItemsUniqueNames(items)

    const blackMarketRequestList = generateApiRequests(
      uniqueNames,
      ['Black%20Market'],
      setBlackMarketResponseFeedback
    )

    let blackMarketPrices: MarketItem[] | null = null
    if (blackMarketRequestList !== null) {
      blackMarketPrices = await fetchMarketData(
        blackMarketRequestList,
        setBlackMarketResponseFeedback
      )
    }

    let validBlackMarketPrices: MarketItem[] | null = null
    if (blackMarketPrices !== null) {
      validBlackMarketPrices = blackMarketPrices.filter(
        (item) => item.buy_price_max !== 0 || item.buy_price_min !== 0
      )
    }

    // let completeBlackMarketPrices: CompleteMarketItem[] = []
    // if (validBlackMarketPrices !== null) {
    //   completeBlackMarketPrices = validBlackMarketPrices.map(({ item_id, ...value }) => {
    //     const foundItem = items.find((item) => item.uniqueName === item_id)

    //     return {
    //       ...value,
    //       item_id,
    //       name: foundItem?.name,
    //       description: foundItem?.description,
    //     }
    //   })
    // }

    const blackMarketUniqueNames = getMarketItemsUniqueNames(validBlackMarketPrices)

    const fortSterlingRequestList = generateApiRequests(
      blackMarketUniqueNames,
      ['Fort%20Sterling'],
      setFortSterlingResponseFeedback
    )
    console.log('fortSterlingRequestList', fortSterlingRequestList)

    let fortSterlingPrices: MarketItem[] | null = null
    if (fortSterlingRequestList !== null) {
      fortSterlingPrices = await fetchMarketData(
        fortSterlingRequestList,
        setFortSterlingResponseFeedback
      )
    }
    console.log('fortSterlingPrices', fortSterlingPrices)

    let validFortSterlingPrices: MarketItem[] | null = null
    if (fortSterlingPrices !== null) {
      validFortSterlingPrices = fortSterlingPrices.filter(
        (item) => item.sell_price_max !== 0 || item.sell_price_min !== 0
      )
    }
    console.log('validFortSterlingPrices', validFortSterlingPrices)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market Prices URLs</h1>
      <p>Generate the list of URLs to request all the prices of the items on the "Black Market".</p>
      <Button onClick={handleClick}>Request Black Market Items</Button>
      <p>
        <span className="inline-block font-medium mr-2 text-gray-300">
          {'Black Market Feedback:'}
        </span>
        {blackMarketResponseFeedback}
      </p>
      <p>
        <span className="inline-block font-medium mr-2 text-gray-300">
          {'Fort Sterling Feedback:'}
        </span>
        {fortSterlingResponseFeedback}
      </p>
    </div>
  )
}

export default Page
