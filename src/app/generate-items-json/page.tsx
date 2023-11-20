'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
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
      <p className={styles.marginBottom}>
        Generate a JSON file with the items that are present in the game.
      </p>
      <Button onClick={fileGenerationResponse}>Generate File</Button>
      <p className={styles.marginTop}>Feedback: {responseText}</p>
    </div>
  )
}

export default Page
