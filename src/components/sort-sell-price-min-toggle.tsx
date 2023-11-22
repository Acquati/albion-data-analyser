'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortSellPriceMinToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
}

const SortSellPriceMinToggle: React.FC<SortSellPriceMinToggleProps> = ({ data, setData }) => {
  const [isSortSellPriceMinAscending, setIsSortSellPriceMinAscending] = useState<boolean>(true)

  const handleSortSellPriceMinToggle = () => {
    const newOrder = !isSortSellPriceMinAscending
    setIsSortSellPriceMinAscending(newOrder)

    if (data) {
      const newData = data.sort((a, b) =>
        newOrder ? a.sell_price_min - b.sell_price_min : b.sell_price_min - a.sell_price_min
      )

      setData([...newData])
    }
  }

  return <SortButton onClick={handleSortSellPriceMinToggle} />
}

export default SortSellPriceMinToggle
