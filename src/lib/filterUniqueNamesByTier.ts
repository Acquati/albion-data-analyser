const filterUniqueNamesByTier = (
  data: (string | null)[],
  prefixes: string[]
): (string | null)[] => {
  return data.filter((value) =>
    prefixes.some((prefix) => (value ? value.startsWith(prefix) : false))
  )
}

export default filterUniqueNamesByTier
