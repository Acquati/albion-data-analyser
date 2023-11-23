'use client'
import { useState } from 'react'
import Button from '@/components/button'
import getPrices from '@/lib/getPrices'
import { Item } from '@/types/Item'
import items from '@/data/items.json'

const Page = () => {
  // const items = ['T8_BAG']
  // const marketNames = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API Call" button to be pressed.'
  )

  const handleClick = async () => {
    // const data = await getPrices({ items, marketNames, setResponseFeedback })
    const uniqueNames = items.map((item: Item) => {
      return item.uniqueName
    })

    const concatenatedUniqueNames = uniqueNames.join(',') // 264703

    console.log(concatenatedUniqueNames.length)
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
