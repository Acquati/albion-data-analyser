'use client'
import { useState } from 'react'
import styles from '@/app/page.module.css'
import Button from '@/components/Button'
import markets from '@/data/markets'
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
      <h1 className={styles.marginBottom}>Black Market</h1>
      <div className={styles.result}>
        <p className={styles.marginBottom}>Black Market items prices test.</p>
        <Button onClick={handleClick}>Make API call</Button>
        <p className={styles.marginTop}>{responseFeedback}</p>
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
