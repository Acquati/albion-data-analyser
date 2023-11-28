'use client'
import { useState } from 'react'
import Button from '@/components/button'
import items from '@/data/items.json'
import generateApiRequests from '@/lib/generateApiRequests'
import getItemsUniqueNames from '@/lib/getItemsUniqueNames'

const Page = () => {
  const [data, setData] = useState<string[] | null>([])
  const marketNames = ['Black%20Market']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Generate URLs" button to be pressed.'
  )

  const handleClick = async () => {
    const uniqueNames = getItemsUniqueNames(items)
    const requestInfoList = generateApiRequests(uniqueNames, marketNames, setResponseFeedback)

    setData(requestInfoList)

    setResponseFeedback('URLs generated successfully.')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Black Market Prices URLs</h1>
      <p>Generate the list of URLs to request all the prices of the items on the "Black Market".</p>
      <Button onClick={handleClick}>Generate URLs</Button>
      <p>{responseFeedback}</p>

      {data &&
        data.map((item, index) => (
          <p className="break-all" key={index}>
            <a
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              href={String(item)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item}
            </a>
          </p>
        ))}
    </div>
  )
}

export default Page
