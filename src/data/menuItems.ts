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
        slug: 'blackmarket',
        description: 'Black Market and other cities items prices test.',
      },
    ],
  },
  {
    name: 'Tools',
    items: [
      {
        name: 'Genera Items JSON',
        slug: 'generateitemsjson',
        description: 'Generate a JSON file with the items that are present in the game.',
      },
    ],
  },
]
