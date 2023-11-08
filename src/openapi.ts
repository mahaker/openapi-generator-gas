import yaml from 'js-yaml'
import fs from 'node:fs'

type GenerateServerSchemaSettings = {
  entry: string
}

type Path = {
  [paths: string]: {
    get: {
      summary: string
      operationId: string
    }
  }
}

const generateServerSchema = (settings: GenerateServerSchemaSettings): void => {
  console.log(loadOpenApiDefinition(settings.entry))
}

const loadOpenApiDefinition = (entry: string): Path[] => {
  const openApiDefinition = yaml.load(fs.readFileSync(entry, { encoding: 'utf8' })) as { paths: Path[] }
  return openApiDefinition.paths
}

type GetHelloFnRequrest = {
  name: string;
  age: number
}
type GetHelloFnResponse = {
  greet: string
}
type GetHelloFn = (res: GetHelloFnRequrest) => GetHelloFnResponse

export { generateServerSchema }
