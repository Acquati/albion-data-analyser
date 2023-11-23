'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortSellPriceMaxToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
  children: React.ReactNode
}

const SortSellPriceMaxToggle: React.FC<SortSellPriceMaxToggleProps> = ({
  data,
  setData,
  children,
}) => {
  const [isSortSellPriceMaxAscending, setIsSortSellPriceMaxAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortSellPriceMaxAscending
    setIsSortSellPriceMaxAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.sell_price_max - b.sell_price_max : b.sell_price_max - a.sell_price_max
      )

      setData(newData)
    }
  }

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortSellPriceMaxToggle
