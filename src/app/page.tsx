'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'
import generateApiRequests from '@/lib/generateApiRequests'

const Page = () => {
  const marketNames = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Generate URLs" button to be pressed.'
  )

  const handleClick = async () => {
    const requestInfoList = generateApiRequests(items, marketNames, setResponseFeedback)

    console.log(requestInfoList)

    // for (const requestInfo in requestInfoList) {
    // }
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
