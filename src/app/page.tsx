'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'
import generateApiRequests from '@/lib/generateApiRequests'
import fetchMarketData from '@/lib/fetchMarketData'
import { MarketItem } from '@/types/MarketItem'
import getItemsUniqueNames from '@/lib/getItemsUniqueNames'
import getMarketItemsUniqueNames from '@/lib/getMarketItemsUniqueNames copy'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortItemIDToggle from '@/components/table/sort-item-id-toggle'
import SortCityToggle from '@/components/table/sort-city-toggle'
import SortQualityToggle from '@/components/table/sort-quality-toggle'
import SortSellPriceMinToggle from '@/components/table/sort-sell-price-min-toggle'
import SortSellPriceMaxToggle from '@/components/table/sort-sell-price-max-toggle'
import SortBuyPriceMinToggle from '@/components/table/sort-buy-price-min-toggle'
import SortBuyPriceMaxToggle from '@/components/table/sort-buy-price-max-toggle'
import SortNameToggle from '@/components/table/sort-name-toggle'
import SortDealValueToggle from '@/components/table/sort-deal-value-toggle'
import SortReturnOfInvestmentToggle from '@/components/table/sort-deal-value-toggle copy'

const Page = () => {
  const [blackMarketResponseFeedback, setBlackMarketResponseFeedback] = useState(
    'Waiting for "Request Black Market Items" button to be pressed.'
  )
  const [cityResponseFeedback, setCityResponseFeedback] = useState(
    'Waiting for "Request Black Market Items" button to be pressed.'
  )

  const [completeBestDeals, setCompleteBestDeals] = useState<CompleteMarketItem[] | null>(null)

  const handleClick = async () => {
    setCityResponseFeedback('Waiting for Black Market Items to be fetched.')

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

    const blackMarketUniqueNames = getMarketItemsUniqueNames(validBlackMarketPrices)

    const cityRequestList = generateApiRequests(
      blackMarketUniqueNames,
      ['Fort%20Sterling'],
      setCityResponseFeedback
    )

    let cityPrices: MarketItem[] | null = null
    if (cityRequestList !== null) {
      cityPrices = await fetchMarketData(cityRequestList, setCityResponseFeedback)
    }

    let validCityPrices: MarketItem[] | null = null
    if (cityPrices !== null) {
      validCityPrices = cityPrices.filter(
        (item) => item.sell_price_max !== 0 || item.sell_price_min !== 0
      )
    }

    let bestDeals: MarketItem[] | null = null
    if (validCityPrices !== null) {
      bestDeals = validCityPrices.filter((cityItem) => {
        const blackMarketItem = blackMarketPrices?.find(
          (blackMarket) => cityItem.item_id === blackMarket.item_id
        )

        let dealValue: number = -2147483647
        if (blackMarketItem !== undefined) {
          dealValue = Math.floor(blackMarketItem?.buy_price_max * 0.92) - cityItem.sell_price_min
        }

        return dealValue >= 3000 && cityItem.sell_price_min < 500000 // && dealValue / cityItem.sell_price_min >= 1.5
      })
    }

    if (bestDeals !== null) {
      setCompleteBestDeals(
        bestDeals.map(({ item_id, sell_price_min, ...value }) => {
          const foundItem = items.find((item) => item.uniqueName === item_id)
          const blackMarketItem = blackMarketPrices?.find(
            (blackMarket) => item_id === blackMarket.item_id
          )

          let dealValue: number = -2147483647
          if (blackMarketItem !== undefined) {
            dealValue = Math.floor(blackMarketItem?.buy_price_max * 0.92) - sell_price_min
          }

          return {
            ...value,
            item_id,
            sell_price_min,
            buy_price_min: blackMarketItem ? blackMarketItem.buy_price_min : 0,
            buy_price_max: blackMarketItem ? blackMarketItem.buy_price_max : 0,
            name: foundItem?.name,
            description: foundItem?.description,
            dealValue: dealValue,
            returnOfInvestment: dealValue / sell_price_min,
          }
        })
      )
    }
    console.log(completeBestDeals)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market Deals</h1>
      <p>List of best Deals on the "Black Market".</p>
      <Button onClick={handleClick}>Request Black Market Items</Button>
      <p>
        <span className="inline-block font-medium mr-2 text-gray-300">
          {'Black Market Request Feedback:'}
        </span>
        {blackMarketResponseFeedback}
      </p>
      <p>
        <span className="inline-block font-medium mr-2 text-gray-300">
          {'City Request Feedback:'}
        </span>
        {cityResponseFeedback}
      </p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  lg:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <SortItemIDToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Item ID
                </SortItemIDToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortNameToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Name
                </SortNameToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortDealValueToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Deal Value
                </SortDealValueToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortReturnOfInvestmentToggle
                  data={completeBestDeals}
                  setData={setCompleteBestDeals}
                >
                  ROI
                </SortReturnOfInvestmentToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortQualityToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Quality
                </SortQualityToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortSellPriceMinToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Sell Price Min
                </SortSellPriceMinToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortSellPriceMaxToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Sell Price Max
                </SortSellPriceMaxToggle>
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <SortBuyPriceMinToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Buy Price Min
                </SortBuyPriceMinToggle>
              </th> */}
              <th scope="col" className="px-6 py-3">
                <SortBuyPriceMaxToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Buy Price Max
                </SortBuyPriceMaxToggle>
              </th>
            </tr>
          </thead>
          <tbody>
            {completeBestDeals &&
              completeBestDeals.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th scope="row" className="px-5 py-3">
                    {item.item_id}
                  </th>
                  <td className="px-5 py-3">
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(item.name ?? '')
                      }}
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.dealValue}
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.returnOfInvestment.toFixed(2)}
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">{item.quality}</td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.sell_price_min}
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.sell_price_max}
                  </td>
                  {/* <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.buy_price_min}
                  </td> */}
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.buy_price_max}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
