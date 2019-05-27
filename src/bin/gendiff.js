#!/usr/bin/env node
import main from '..';
import commander from 'commander';

const program = new commander.Command();

program
  .version('0.0.2')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig, options) => {
    console.log(firstConfig);
    console.log(secondConfig);
    console.log(options);
    main();
  });

program.parse(process.argv);
