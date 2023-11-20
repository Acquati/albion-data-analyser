'use client'
import { useState } from 'react'
import styles from './page.module.css'
import Button from '@/components/button'
import marketNames from '@/data/marketNames'
import getPrices from '@/lib/getPrices'
import { MarketItem } from '@/types/MarketItem'

const Page = () => {
  const items = ['T8_BAG']
  const [data, setData] = useState<MarketItem[] | null>(null)

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API Call" button to be pressed.'
  )

  const handleClick = async () => {
    setData(await getPrices({ items, marketNames, setResponseFeedback }))
    console.log(data)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market</h1>
      <p>Black Market and other cities items prices test.</p>
      <Button onClick={handleClick}>Make API Call</Button>
      <p>{responseFeedback}</p>
      <h1>JSON Data</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>City</th>
            <th>Quality</th>
            <th>Sell Price Min</th>
            <th>Sell Price Max</th>
            <th>Buy Price Min</th>
            <th>Buy Price Max</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.item_id}</td>
                <td>{item.city}</td>
                <td className="text-right">{item.quality}</td>
                <td className="text-right">{item.sell_price_min}</td>
                <td className="text-right">{item.sell_price_max}</td>
                <td className="text-right">{item.buy_price_min}</td>
                <td className="text-right">{item.buy_price_max}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Page
