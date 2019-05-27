#!/usr/bin/env node
import genDiff from '..';
import commander from 'commander';

const program = new commander.Command();

program
  .version('0.0.2')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((firstConfig, secondConfig, options) => {
    const { format } = options;
    const diff = genDiff(firstConfig, secondConfig);
    console.log(format);
    console.log(diff);
  });

program.parse(process.argv);
