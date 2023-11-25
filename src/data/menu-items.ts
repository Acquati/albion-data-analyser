export type MenuItem = {
  name: string
  slug: string
  description?: string
}

export const menuItems: { name: string; items: MenuItem[] }[] = [
  {
    name: 'Market Analyses',
    items: [
      {
        name: 'Black Market',
        slug: 'black-market',
        description: 'Black Market and other cities items prices test.',
      },
    ],
  },
  {
    name: 'Tools',
    items: [
      {
        name: 'Genera Items JSON',
        slug: 'generate-items-json',
        description: 'Generate a JSON file with the items that are present in the game.',
      },
      {
        name: 'Items Available At Black Market',
        slug: 'items-available-at-black-market',
        description: 'Items available at Black Market.',
      },
      {
        name: 'Black Market Prices URLs',
        slug: 'black-market-prices-urls',
        description:
          'Generate the list of URLs to request all the prices of the items on the "Black Market".',
      },
    ],
  },
]
