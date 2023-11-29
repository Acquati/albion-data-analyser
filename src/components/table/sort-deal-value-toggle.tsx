'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortDealValueToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  additionalClass?: string
  children: React.ReactNode
}

const SortDealValueToggle: React.FC<SortDealValueToggleProps> = ({
  data,
  setData,
  additionalClass,
  children,
}) => {
  const [isSortDealValueAscending, setIsSortDealValueAscending] = useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortDealValueAscending
    setIsSortDealValueAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder ? a.dealValue - b.dealValue : b.dealValue - a.dealValue
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

export default SortDealValueToggle
