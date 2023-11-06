'use client'
import { useState } from 'react'
import styles from './page.module.css'
import Button from '@/components/Button'

const Home = () => {
  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API call" button to be pressed.'
  )

  const callAPI = async () => {
    const APIHostURL = 'https://west.albion-online-data.com'
    const pricesEndpoint = '/api/v2/stats/Prices/'
    const itemList = 'T4_BAG%2CT5_BAG'
    const format = '.json'
    const locations = '?locations=' + 'Caerleon%2CBridgewatch'
    const qualities = '&qualities=' + '5'
    const APIEndpoint = pricesEndpoint + itemList + format + locations + qualities
    const requestInfo = APIHostURL + APIEndpoint

    let lastCallTime = null
    let callCount1Min = 0
    let callCount5Min = 0

    try {
      if (requestInfo.length > 4096) {
        setResponseFeedback('Error: Exceeded 4096 characters limit of the request information.')
        throw new Error('Exceeded 4096 characters limit of the request information.')
      }

      const now = Date.now()

      // 180 per minute rate limit logic.
      if (lastCallTime && now - lastCallTime < 60000) {
        callCount1Min += 1
      } else {
        callCount1Min = 1
        lastCallTime = now
      }

      // 300 per 5 minutes rate limit logic.
      if (lastCallTime && now - lastCallTime < 300000) {
        callCount5Min += 1
      } else {
        callCount5Min = 1
      }

      if (callCount1Min > 180) {
        setResponseFeedback('Error: API call rate limit exceeded 180 per minute.')
        throw new Error('API call rate limit exceeded 180 per minute.')
      }

      if (callCount5Min > 300) {
        setResponseFeedback('Error: API call rate limit exceeded 300 per 5 minutes.')
        throw new Error('API call rate limit exceeded 300 per 5 minutes.')
      }

      const res = await fetch(requestInfo)
      const data = await res.json()

      setResponseFeedback('Data successfully fetched.')
      console.log(data)
    } catch (err) {
      setResponseFeedback('Error: ' + String(err))
      console.log(err)
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.result}>
        <Button onClick={callAPI}>Make API call</Button>
        <p className={styles.marginTop}>{responseFeedback}</p>
      </div>
    </main>
  )
}

export default Home
