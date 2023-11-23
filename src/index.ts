#!/usr/bin/env node

import { defineCommand, runMain } from 'citty';
import { generateFrontendSchema } from './generate';

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
    server: {
      type: 'boolean',
      description: 'Generated code format(for server)',
    },
  },
  run({ args }) {
    if (args.frontend) generateFrontendSchema({specFilePath: args.spec, outFilePath: args.outfile});
  },
});

runMain(main);
