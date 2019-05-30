import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt').toString().trim();
const expectedBig = fs.readFileSync('__tests__/__fixtures__/expected-big.txt').toString().trim();
const expectedPlain = fs.readFileSync('__tests__/__fixtures__/expected-plain.txt').toString().trim();

const testJson = [
  '__tests__/__fixtures__/before.json',
  '__tests__/__fixtures__/after.json',
];

const testYaml = [
  '__tests__/__fixtures__/before.yml',
  '__tests__/__fixtures__/after.yml',
];

const testIni = [
  '__tests__/__fixtures__/before.ini',
  '__tests__/__fixtures__/after.ini',
];

test.each([testJson, testYaml, testIni])(
  'Small files to genDiff(%s,%s)',
  (path1, path2) => {
    expect(genDiff(path1, path2)).toBe(expected);
  },
);

const testJsonBig = [
  '__tests__/__fixtures__/before-big.json',
  '__tests__/__fixtures__/after-big.json',
];

const testYamlBig = [
  '__tests__/__fixtures__/before-big.yml',
  '__tests__/__fixtures__/after-big.yml',
];

const testIniBig = [
  '__tests__/__fixtures__/before-big.ini',
  '__tests__/__fixtures__/after-big.ini',
];

test.each([testJsonBig, testYamlBig, testIniBig])(
  'Big files to genDiff(%s,%s)',
  (path1, path2) => {
    expect(genDiff(path1, path2)).toBe(expectedBig);
  },
);


test.each([testJsonBig, testYamlBig, testIniBig])(
  'Big files to genDiff(%s,%s) with plain option',
  (path1, path2) => {
    expect(genDiff(path1, path2, 'plain')).toBe(expectedPlain);
  },
);
