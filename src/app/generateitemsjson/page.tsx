'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/Button'

const GenerateItemsJSON = () => {
  const [responseText, setResponseText] = useState(
    'Waiting for "Generate File" button to be pressed.'
  )

  const fileGenerationResponse = async () => {
    const response = await fetch('/api/generateItemsJSONFile')
    setResponseText(await response.text())
  }

  return (
    <main className={styles.main}>
      <div className={styles.result}>
        <p className={styles.marginBottom}>
          Generate a JSON file with the items that are present in the game.
        </p>
        <Button onClick={fileGenerationResponse}>Generate File</Button>
        <p className={styles.marginTop}>Feedback: {responseText}</p>
      </div>
    </main>
  )
}

export default GenerateItemsJSON
