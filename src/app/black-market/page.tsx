'use client'
import { useState } from 'react'
import Button from '@/components/button'
import marketNames from '@/data/market-names'
import getPrices from '@/lib/getPrices'
import { MarketItem } from '@/types/MarketItem'
import SortButton from '@/components/sort-button'

const onSortButtonClick = () => {
  console.log('onSortButtonClick')
}

const Page = () => {
  const items = ['T8_BAG']
  const [data, setData] = useState<MarketItem[] | null>(null)
  const [isSortQualityAscending, setIsSortQualityAscending] = useState<boolean>(true)

  const handleSortQualityToggle = () => {
    const newOrder = !isSortQualityAscending
    setIsSortQualityAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.quality - b.quality : b.quality - a.quality
      )

      setData(newData)
    }
  }

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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Item ID
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  City
                  <SortButton onClick={onSortButtonClick} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Quality
                  <SortButton onClick={handleSortQualityToggle} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Sell Price Min
                  <SortButton onClick={onSortButtonClick} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Sell Price Max
                  <SortButton onClick={onSortButtonClick} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Buy Price Min
                  <SortButton onClick={onSortButtonClick} />
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Buy Price Max
                  <SortButton onClick={onSortButtonClick} />
                </div>
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
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.item_id}
                  </th>
                  <td className="px-6 py-4">{item.city}</td>
                  <td className="px-6 py-4 text-right dark:text-white">{item.quality}</td>
                  <td className="px-6 py-4 text-right dark:text-white">{item.sell_price_min}</td>
                  <td className="px-6 py-4 text-right dark:text-white">{item.sell_price_max}</td>
                  <td className="px-6 py-4 text-right dark:text-white">{item.buy_price_min}</td>
                  <td className="px-6 py-4 text-right dark:text-white">{item.buy_price_max}</td>
                  {/* <td className="px-6 py-4 text-right">
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
