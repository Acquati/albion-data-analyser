'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortSellPriceMinToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
  children: React.ReactNode
}

const SortSellPriceMinToggle: React.FC<SortSellPriceMinToggleProps> = ({
  data,
  setData,
  children,
}) => {
  const [isSortSellPriceMinAscending, setIsSortSellPriceMinAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortSellPriceMinAscending
    setIsSortSellPriceMinAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.sell_price_min - b.sell_price_min : b.sell_price_min - a.sell_price_min
      )

      setData(newData)
    }
  }

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortSellPriceMinToggle
