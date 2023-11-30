'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/market_items.json'
import generateApiRequests from '@/lib/generateApiRequests'
import fetchMarketData from '@/lib/fetchMarketData'
import { MarketItem } from '@/types/MarketItem'
import getItemsUniqueNames from '@/lib/getItemsUniqueNames'
import getMarketItemsUniqueNames from '@/lib/getMarketItemsUniqueNames copy'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortItemIDToggle from '@/components/table/sort-item-id-toggle'
import SortQualityToggle from '@/components/table/sort-quality-toggle'
import SortSellPriceMinToggle from '@/components/table/sort-sell-price-min-toggle'
import SortBuyPriceMaxToggle from '@/components/table/sort-buy-price-max-toggle'
import SortNameToggle from '@/components/table/sort-name-toggle'
import SortDealValueToggle from '@/components/table/sort-deal-value-toggle'
import SortReturnOfInvestmentToggle from '@/components/table/sort-deal-value-toggle copy'
import convertDateToMinutesSinceNow from '@/lib/convertDateToMinutesSinceNow'
import filterUniqueNamesByTier from '@/lib/filterUniqueNamesByTier'

const Page = () => {
  const [blackMarketResponseFeedback, setBlackMarketResponseFeedback] = useState<string>(
    'Waiting for "Request Black Market Items" button to be pressed.'
  )
  const [cityResponseFeedback, setCityResponseFeedback] = useState<string>(
    'Waiting for "Request Black Market Items" button to be pressed.'
  )
  const [dealValueMin, setDealValueMin] = useState<number>(3000)
  const [cityPriceMax, setCityPriceMax] = useState<number>(500000)
  const [tierList, setTierList] = useState<string[]>(['T5'])
  const [cityList, setCityList] = useState<string[]>(['Caerleon'])

  const [completeBestDeals, setCompleteBestDeals] = useState<CompleteMarketItem[] | null>(null)

  const handleClick = async () => {
    setCityResponseFeedback('Waiting for Black Market Items to be fetched.')

    let uniqueNames = getItemsUniqueNames(items)

    if (tierList.length !== 0) {
      uniqueNames = filterUniqueNamesByTier(uniqueNames, tierList)
    }

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
      cityList,
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

        return dealValue >= dealValueMin && cityItem.sell_price_min < cityPriceMax // && dealValue / cityItem.sell_price_min >= 1.5
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
            buy_price_max: blackMarketItem ? blackMarketItem.buy_price_max : 0,
            buy_price_max_date: blackMarketItem
              ? blackMarketItem.buy_price_max_date
              : '0001-01-01T00:00:00',
            buy_price_min: blackMarketItem ? blackMarketItem.buy_price_min : 0,
            buy_price_min_date: blackMarketItem
              ? blackMarketItem.buy_price_min_date
              : '0001-01-01T00:00:00',
            item_id,
            sell_price_min,
            name: foundItem?.name,
            description: foundItem?.description,
            dealValue: dealValue,
            returnOfInvestment: dealValue / sell_price_min,
          }
        })
      )
    }
  }

  const handleClick2 = () => {
    convertDateToMinutesSinceNow('2023-11-29T01:45:00')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market Deals</h1>
      <p>List of best Deals on the "Black Market".</p>
      <Button onClick={handleClick}>Request Black Market Items</Button>
      <Button onClick={handleClick2}>Test</Button>
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
        <table className="w-full text-sm lg:text-base text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs  lg:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortItemIDToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Item ID
                </SortItemIDToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortNameToggle data={completeBestDeals} setData={setCompleteBestDeals}>
                  Name
                </SortNameToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortQualityToggle
                  data={completeBestDeals}
                  setData={setCompleteBestDeals}
                  additionalClass={'justify-end'}
                >
                  Quality
                </SortQualityToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortDealValueToggle
                  data={completeBestDeals}
                  setData={setCompleteBestDeals}
                  additionalClass={'justify-end'}
                >
                  Deal Value
                </SortDealValueToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortReturnOfInvestmentToggle
                  data={completeBestDeals}
                  setData={setCompleteBestDeals}
                  additionalClass={'justify-end'}
                >
                  ROI
                </SortReturnOfInvestmentToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortSellPriceMinToggle
                  data={completeBestDeals}
                  setData={setCompleteBestDeals}
                  additionalClass={'justify-end'}
                >
                  Sell Price Min
                </SortSellPriceMinToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                <SortBuyPriceMaxToggle
                  data={completeBestDeals}
                  setData={setCompleteBestDeals}
                  additionalClass={'justify-end'}
                >
                  Buy Price Max
                </SortBuyPriceMaxToggle>
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap text-right">
                Sell Price Date
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap text-right">
                Buy Price Date
              </th>
            </tr>
          </thead>
          <tbody>
            {completeBestDeals &&
              completeBestDeals.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th scope="row" className="px-4 py-3 whitespace-nowrap">
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(item.item_id ?? '')
                      }}
                    >
                      {item.item_id}
                    </a>
                  </th>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(item.name ?? '')
                      }}
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {item.quality}
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {item.dealValue}
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {item.returnOfInvestment.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {item.sell_price_min}
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {item.buy_price_max}
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {convertDateToMinutesSinceNow(item.sell_price_min_date) + ' minutes'}
                  </td>
                  <td className="px-4 py-3 dark:text-white font-mono whitespace-nowrap text-right">
                    {convertDateToMinutesSinceNow(item.buy_price_max_date) + ' minutes'}
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
