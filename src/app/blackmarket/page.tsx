'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/Button'
import markets from '@/data/markets'
import { MarketItem } from '@/types/MarketItem'

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
  // Gold -> Silver -> R$1 = 235079 Silver
  // TODO: You can sell your higher quality items to a lower quality buy order, but not the other way around.
  /* Items Categories:
  Accessories:
  Bag, Cape

  Armor:
  Cloth Armor, Cloth Helmet, Cloth Shoes,
  Leather Armor, Leather Helmet, Leather Shoes,
  Plate Armor, Plate Helmet, Plate Shoes

  Gathering Gear:
  Harvester Garb, Harvester Backpack, Harvester Cap, Harvester Workboots,
  Skinner Garb, Skinner Backpack, Skinner Cap, Skinner Workboots,
  Miner Garb, Miner Backpack, Miner Cap, Miner Workboots,
  Quarrier Garb, Quarrier Backpack, Quarrier Cap, Quarrier Workboots,
  Lumberjack Garb, Lumberjack Backpack, Lumberjack Cap, Lumberjack Workboots

  Magic:
  Arcane Staff, Cursed Staff, Fire Staff, Frost Staff, Holy Staff, Nature Staff, Shapeshifter Staff

  Melee:
  Axe, Dagger, Hammer, War Gloves, Mace, Quarterstaff, Spear, Sword

  Off-Hand:
  Book, Horn, Orb, Shield, Torch, Totem

  Ranged:
  Bow, Crossbow

  Tool:
  Pickaxe, Sickle, Skinning Knife, Stone Hammer, Wood Axe
  */

  const items = ['T2_BAG', 'T3_BAG', 'T4_BAG', 'T5_BAG', 'T6_BAG', 'T7_BAG', 'T8_BAG']

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API call" button to be pressed.'
  )

  const callAPI = async () => {
    const APIHostURL = 'https://west.albion-online-data.com'
    const pricesEndpoint = '/api/v2/stats/Prices/'
    const itemList = items.join('%2C')
    const format = '.json'
    const locations = '?locations=' + 'BlackMarket' //+ markets.join('%2C')
    // 0 = all the qualities, 1 to 5 specific quality
    const qualities = '&qualities=' + '0'
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
      const data: MarketItem[] = await res.json()
      const filteredData = data.filter(
        (item) =>
          item.buy_price_max !== 0 ||
          item.buy_price_min !== 0 ||
          item.sell_price_max !== 0 ||
          item.sell_price_min !== 0
      )

      const uniqueItemIds: String[] = []
      const filteredItemIds = filteredData
        .filter(
          (item) =>
            item.buy_price_max !== 0 ||
            item.buy_price_min !== 0 ||
            item.sell_price_max !== 0 ||
            item.sell_price_min !== 0
        )
        .map((item) => {
          if (!uniqueItemIds.includes(item.item_id)) {
            uniqueItemIds.push(item.item_id)
            return item.item_id
          }
          return null
        })
        .filter((item) => item !== null)

      setResponseFeedback('Data successfully fetched.')
      console.log(data)
      console.log(filteredData)
      console.log(filteredItemIds)
    } catch (error) {
      console.error(error)
      setResponseFeedback('Error: ' + String(error))
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
