'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { CompleteMarketItem } from '@/types/CompleteMarketItem'
import SortButton from './sort-button'

interface SortReturnOfInvestmentToggleProps {
  data: CompleteMarketItem[] | null
  setData: Dispatch<SetStateAction<CompleteMarketItem[] | null>>
  children: React.ReactNode
}

const SortReturnOfInvestmentToggle: React.FC<SortReturnOfInvestmentToggleProps> = ({
  data,
  setData,
  children,
}) => {
  const [isSortReturnOfInvestmentAscending, setIsSortReturnOfInvestmentAscending] =
    useState<boolean>(true)

  const onClick = () => {
    const newOrder = !isSortReturnOfInvestmentAscending
    setIsSortReturnOfInvestmentAscending(newOrder)

    if (data) {
      const newData = [...data].sort((a, b) =>
        newOrder
          ? a.returnOfInvestment - b.returnOfInvestment
          : b.returnOfInvestment - a.returnOfInvestment
      )

      setData(newData)
    }
  }

  return <SortButton onClick={onClick}>{children}</SortButton>
}

export default SortReturnOfInvestmentToggle
