'use client'
import styles from './page.module.css'
import Button from '@/components/Button'

const Home = () => {
  const callAPI = async () => {
    console.log('API call')
  }

  return (
    <main className={styles.main}>
      <div className={styles.result}>
        <Button onClick={callAPI}>Make API call</Button>
      </div>
    </main>
  )
}

export default Home
