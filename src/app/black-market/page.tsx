'use client'
import { useState } from 'react'
import Button from '@/components/button'
import marketNames from '@/data/market-names'
import getPrices from '@/lib/getPrices'
import { MarketItem } from '@/types/MarketItem'
import SortQualityToggle from '@/components/table/sort-quality-toggle'
import SortSellPriceMinToggle from '@/components/table/sort-sell-price-min-toggle'
import SortSellPriceMaxToggle from '@/components/table/sort-sell-price-max-toggle'
import SortBuyPriceMinToggle from '@/components/table/sort-buy-price-min-toggle'
import SortBuyPriceMaxToggle from '@/components/table/sort-buy-price-max-toggle'
import SortCityToggle from '@/components/table/sort-city-toggle'
import SortItemIDToggle from '@/components/table/sort-item-id-toggle'

const onSortButtonClick = () => {
  console.log('onSortButtonClick')
}

const Page = () => {
  const items = ['T8_BAG']
  const [data, setData] = useState<MarketItem[] | null>(null)

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API Call" button to be pressed.'
  )

  const handleMakeAPICall = async () => {
    setData(await getPrices({ items, marketNames, setResponseFeedback }))
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market</h1>
      <p>Black Market and other cities items prices test.</p>
      <Button onClick={handleMakeAPICall}>Make API Call</Button>
      <p>{responseFeedback}</p>
      <h1 className="text-xl font-medium text-gray-300">JSON Data</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs  lg:text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <SortItemIDToggle data={data} setData={setData}>
                  Item ID
                </SortItemIDToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortCityToggle data={data} setData={setData}>
                  City
                </SortCityToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortQualityToggle data={data} setData={setData}>
                  Quality
                </SortQualityToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortSellPriceMinToggle data={data} setData={setData}>
                  Sell Price Min
                </SortSellPriceMinToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortSellPriceMaxToggle data={data} setData={setData}>
                  Sell Price Max
                </SortSellPriceMaxToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortBuyPriceMinToggle data={data} setData={setData}>
                  Buy Price Min
                </SortBuyPriceMinToggle>
              </th>
              <th scope="col" className="px-6 py-3">
                <SortBuyPriceMaxToggle data={data} setData={setData}>
                  Buy Price Max
                </SortBuyPriceMaxToggle>
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th
                    scope="row"
                    className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.item_id}
                  </th>
                  <td className="px-5 py-3">{item.city}</td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">{item.quality}</td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.sell_price_min}
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.sell_price_max}
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.buy_price_min}
                  </td>
                  <td className="px-5 py-3 text-right dark:text-white font-mono">
                    {item.buy_price_max}
                  </td>
                  {/* <td className="px-5 py-3 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Page
