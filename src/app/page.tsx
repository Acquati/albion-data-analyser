'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/Button'
// import markets from '@/data/markets'
import callPricesAPI from '@/utils/getPrices'
import getUniqueNames from '@/utils/getUniqueNames'

const items = [
  {
    name: 'Hideout Construction Kit',
    description: 'Hideout construction kits are used to place Guild Hideouts in the Outlands.',
    index: '1',
    uniqueName: 'UNIQUE_HIDEOUT',
  },
  {
    name: "Journeyman's Tracking Toolkit",
    description: 'Use this tool to search for tracks in the open world.',
    index: '2',
    uniqueName: 'T3_2H_TOOL_TRACKING',
  },
]

const Home = () => {
  const items = ['T8_BAG']
  const markets = ['BlackMarket']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API call" button to be pressed.'
  )

  const handleClick = async () => {
    const data = await callPricesAPI({ items, markets, setResponseFeedback })
    console.log(data)
    console.log(getUniqueNames(data))
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.marginBottom}>Home</h1>
      <div className={styles.result}>
        <p className={styles.marginBottom}>Market items prices test.</p>
        <Button onClick={handleClick}>Make API call</Button>
        <p className={styles.marginTop}>{responseFeedback}</p>
      </div>
    </main>
  )
}

export default Home
