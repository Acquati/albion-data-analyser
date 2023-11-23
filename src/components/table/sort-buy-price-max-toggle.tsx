'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MarketItem } from '@/types/MarketItem'
import SortButton from './sort-button'

interface SortBuyPriceMaxToggleProps {
  data: MarketItem[] | null
  setData: Dispatch<SetStateAction<MarketItem[] | null>>
  children: React.ReactNode
}

const SortBuyPriceMaxToggle: React.FC<SortBuyPriceMaxToggleProps> = ({
  data,
  setData,
  children,
}) => {
  const [isSortBuyPriceMaxAscending, setIsSortBuyPriceMaxAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortBuyPriceMaxAscending
    setIsSortBuyPriceMaxAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.buy_price_max - b.buy_price_max : b.buy_price_max - a.buy_price_max
      )

      setData(newData)
    }
  }

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortBuyPriceMaxToggle
