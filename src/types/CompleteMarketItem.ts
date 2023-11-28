import { MarketItem } from './MarketItem'

export interface CompleteMarketItem extends MarketItem {
  name: string | undefined
  description: string | undefined
}
