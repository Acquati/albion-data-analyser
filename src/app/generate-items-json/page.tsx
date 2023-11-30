'use client'
import { useState } from 'react'
import Button from '@/components/button'

const Page = () => {
  const [responseText, setResponseText] = useState(
    'Waiting for "Generate File" button to be pressed.'
  )

  const fileGenerationResponse = async () => {
    const response = await fetch('/api/generate-items-json')
    setResponseText(await response.text())
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Generate a JSON File</h1>
      <p>Generate a JSON file with the items that are present in the game.</p>
      <Button onClick={fileGenerationResponse}>Generate File</Button>
      <p>Feedback: {responseText}</p>
      <p>
        Last "items_raw.json" download and "items.json" generated: Wed Nov 29 2023 23:14:09 GMT-0300
        (Brasilia Standard Time)
      </p>
    </div>
  )
}

export default Page
