'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/Button'
import getPrices from '@/lib/getPrices'

const Home = () => {
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
    <main className={styles.main}>
      <h1 className={styles.marginBottom}>Albion Data Analyser</h1>
      <div className={styles.result}>
        <p className={styles.marginBottom}>Markets items prices test.</p>
        <Button onClick={handleClick}>Make API Call</Button>
        <p className={styles.marginTop}>{responseFeedback}</p>
      </div>
    </main>
  )
}

export default Home
