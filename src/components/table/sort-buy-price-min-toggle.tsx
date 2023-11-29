'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortBuyPriceMinToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortBuyPriceMinToggle: React.FC<SortBuyPriceMinToggleProps> = ({
  data,
  setData,
  additionalClass,
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

  return (
    <SortButton onClick={onClick} additionalClass={additionalClass}>
      {children}
    </SortButton>
  )
}

export default SortBuyPriceMinToggle
