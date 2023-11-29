'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortSellPriceMaxToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortSellPriceMaxToggle: React.FC<SortSellPriceMaxToggleProps> = ({
  data,
  setData,
  additionalClass,
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

  return (
    <SortButton onClick={onClick} additionalClass={additionalClass}>
      {children}
    </SortButton>
  )
}

export default SortSellPriceMaxToggle
