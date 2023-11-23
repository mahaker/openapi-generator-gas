import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';
import type * as OpenAPITypes from './types';

const loadOpenApiSpec = (entry: string): OpenAPITypes.PathsObject => {
  const spec = yaml.load(fs.readFileSync(entry, { encoding: 'utf8' })) as OpenAPITypes.OpenAPIObject;
  return spec.paths;
};

const writeSchemaToFile = (filePath: string, code: OpenAPITypes.GeneratedCode): void => {
  const outfileDir = path.dirname(filePath);
  if (!fs.existsSync(outfileDir)) {
    fs.mkdirSync(outfileDir, { recursive: true });
  }
  fs.writeFileSync(filePath, code.code, { encoding: 'utf8' });
};

export { loadOpenApiSpec, writeSchemaToFile };
