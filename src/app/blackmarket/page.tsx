'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/Button'
import markets from '@/data/markets'
import callPricesAPI from '@/utils/getPrices'
import getUniqueNames from '@/utils/getUniqueNames'

interface PricesItem {
  item_id: string
  city: string
  quality: number
  sell_price_min: number
  sell_price_min_date: string
  sell_price_max: number
  sell_price_max_date: string
  buy_price_min: number
  buy_price_min_date: string
  buy_price_max: number
  buy_price_max_date: string
}

const Home = () => {
  const items = ['T8_BAG']
  const [data, setData] = useState<PricesItem[] | null>(null)

  const [responseFeedback, setResponseFeedback] = useState(
    'Waiting for "Make API call" button to be pressed.'
  )

  const handleClick = async () => {
    setData(await callPricesAPI({ items, markets, setResponseFeedback }))
    console.log(data)
    console.log(getUniqueNames(data))
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.marginBottom}>Black Market</h1>
      <div className={styles.result}>
        <p className={styles.marginBottom}>Black Market items prices test.</p>
        <Button onClick={handleClick}>Make API call</Button>
        <p className={styles.marginTop}>{responseFeedback}</p>
      </div>
      <h1 className={styles.marginTop}>JSON Data</h1>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item ID</th>
              <th>City</th>
              <th>Quality</th>
              <th>Sell Price Min</th>
              <th>Sell Price Max</th>
              <th>Buy Price Min</th>
              <th>Buy Price Max</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_id}</td>
                  <td>{item.city}</td>
                  <td className={styles.textAlignRight}>{item.quality}</td>
                  <td className={styles.textAlignRight}>{item.sell_price_min}</td>
                  <td className={styles.textAlignRight}>{item.sell_price_max}</td>
                  <td className={styles.textAlignRight}>{item.buy_price_min}</td>
                  <td className={styles.textAlignRight}>{item.buy_price_max}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Home

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