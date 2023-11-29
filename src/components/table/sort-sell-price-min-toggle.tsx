'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortSellPriceMinToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortSellPriceMinToggle: React.FC<SortSellPriceMinToggleProps> = ({
  data,
  setData,
  additionalClass,
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

  return (
    <SortButton onClick={onClick} additionalClass={additionalClass}>
      {children}
    </SortButton>
  )
}

export default SortSellPriceMinToggle
