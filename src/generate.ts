import { loadOpenApiSpec, writeSchemaToFile } from './file';
import { collectOperations, renderOperationsToStringForFrontend, renderOperationsToStringForBackend } from './openapi';

type GenerateSchemaSettings = {
  specFilePath: string;
  outFilePath: string;
};

const generateFrontendSchema = (settings: GenerateSchemaSettings): void => {
  const { specFilePath, outFilePath } = settings;
  const pathsObject = loadOpenApiSpec(specFilePath);

  const operations = collectOperations(pathsObject);
  const code = renderOperationsToStringForFrontend(operations);

  writeSchemaToFile(outFilePath, code);
};

const generateBackendSchema = (settings: GenerateSchemaSettings): void => {
  const { specFilePath, outFilePath } = settings;
  const pathsObject = loadOpenApiSpec(specFilePath);

  const operations = collectOperations(pathsObject);
  const code = renderOperationsToStringForBackend(operations);

  writeSchemaToFile(outFilePath, code);
};

export { generateFrontendSchema, generateBackendSchema };
