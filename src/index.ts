import { defineCommand, runMain } from 'citty';

const main = defineCommand({
  meta: {
    name: "hello",
    version: "1.0.0",
    description: "My Awesome CLI App",
  },
  args: {
    name: {
      type: "positional",
      description: "Your name",
      required: true,
    },
    address: {
      type: "positional",
      description: "Your home address",
      required: true,
    },
    friendly: {
      type: "boolean",
      description: "Use friendly greeting",
    },
    dist: {
      type: "string",
      description: "The code dist folder",
    },
  },
  run({ args }) {
    console.log(`${args.friendly ? "Hi" : "Greetings"} ${args.name}! And address is ${args.address}`);
    console.log(`The dist folder is ${args.dist}`);
  },
});

runMain(main);

