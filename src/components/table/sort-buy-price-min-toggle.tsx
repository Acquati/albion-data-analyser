'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortBuyPriceMinToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
  children: React.ReactNode
}

const SortBuyPriceMinToggle: React.FC<SortBuyPriceMinToggleProps> = ({
  data,
  setData,
  children,
}) => {
  const [isSortBuyPriceMinAscending, setIsSortBuyPriceMinAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortBuyPriceMinAscending
    setIsSortBuyPriceMinAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.buy_price_min - b.buy_price_min : b.buy_price_min - a.buy_price_min
      )

      setData(newData)
    }
  }

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortBuyPriceMinToggle
