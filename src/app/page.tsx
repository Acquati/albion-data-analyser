'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/button'
import getPrices from '@/lib/getPrices'

const Page = () => {
  const items = ['T8_BAG']
  const marketNames = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API Call" button to be pressed.'
  )

  const handleClick = async () => {
    const data = await getPrices({ items, marketNames, setResponseFeedback })
    console.log(data)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">Albion Data Analyser</h1>
      <p className={styles.marginBottom}>Markets items prices test.</p>
      <Button onClick={handleClick}>Make API Call</Button>
      <p className={styles.marginTop}>{responseFeedback}</p>
    </div>
  )
}

export default Page
