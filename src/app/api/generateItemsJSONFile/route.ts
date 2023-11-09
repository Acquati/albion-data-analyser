import { promises as fs } from 'fs'

interface InputData {
  LocalizationNameVariable: string
  LocalizationDescriptionVariable: string
  LocalizedNames: { [key: string]: string }
  LocalizedDescriptions: { [key: string]: string }
  Index: string
  UniqueName: string
}

interface OutputData {
  name: string
  description: string
  index: string
  uniqueName: string
}

const transformData = (inputData: InputData[]): string => {
  const transformedData = inputData.map((item) => {
    const { LocalizedNames, LocalizedDescriptions, Index, UniqueName } = item
    return {
      name: LocalizedNames['EN-US'],
      description: LocalizedDescriptions['EN-US'],
      index: Index,
      uniqueName: UniqueName,
    }
  })

  return JSON.stringify(transformedData, null, 2)
}

export async function GET(_request: Request) {
  try {
    const file = await fs.readFile(process.cwd() + '/src/data/items_raw_test.json', 'utf8')
    const inputData = JSON.parse(file)

    // const inputData = itemsRaw as InputData[]
    const transformedData = transformData(inputData)

    // Define the file path where you want to save the JSON file
    const filePath = './public/items.json'

    // Write the JSON content to the file
    await fs.writeFile(filePath, transformedData)

    return new Response('The JSON file has been generated at ./public/items.json')
  } catch (error) {
    console.error(error)
    return new Response('Error: ' + String(error))
  }
}
