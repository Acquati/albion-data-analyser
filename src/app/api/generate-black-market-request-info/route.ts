import { promises as fs } from 'fs'

interface InputData {
  name: string
  description: string
  index: string
  uniqueName: string
}

const transformData = (inputData: InputData[]): string[] => {
  const transformedData = inputData.map((item) => {
    return item.uniqueName
  })

  return transformedData
}

export async function GET(_request: Request) {
  try {
    const file = await fs.readFile(process.cwd() + '/src/data/items.json', 'utf8')
    const inputData = JSON.parse(file)
    let lau: ReadableStream<any>

    // const inputData = itemsRaw as InputData[]
    const transformedData = transformData(inputData)
    console.log(transformedData)

    // Define the file path where you want to save the JSON file
    // const filePath = './src/data/items.json'

    // Write the JSON content to the file
    // await fs.writeFile(filePath, transformedData)

    return new Response({ body: transformedData })
  } catch (error) {
    console.error(error)
    return new Response('Error: ' + String(error))
  }
}
