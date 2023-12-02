#!/usr/bin/env node

import { defineCommand, runMain } from 'citty';
import { generateFrontendSchema, generateBackendSchema } from './generate';

const main = defineCommand({
  meta: {
    name: 'openapi-generator-gas',
    version: '0.0.1',
    description: 'OpenAPI code generator for Google Apps Script',
  },
  args: {
    spec: {
      type: 'string',
      description: 'The OpenAPI specification file',
      required: true,
    },
    outfile: {
      type: 'string',
      description: 'The generated file',
      required: true,
    },
    frontend: {
      type: 'boolean',
      description: 'Generated code format(for frontend)',
    },
    backend: {
      type: 'boolean',
      description: 'Generated code format(for backend)',
    },
  },
  run({ args }) {
    const { spec, outfile, frontend: isFrontend, backend: isBackend } = args;

    if (isFrontend && isBackend) throw new Error('Please pick either --frontend or --backend');

    if (args.frontend) generateFrontendSchema({specFilePath: spec, outFilePath: outfile});
    if (args.backend) generateBackendSchema({specFilePath: spec, outFilePath: outfile});
  },
});

runMain(main);
