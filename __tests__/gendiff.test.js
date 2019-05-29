import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt').toString().trim();
const expectedBig = fs.readFileSync('__tests__/__fixtures__/expected-big.txt').toString().trim();
// const pathToJson1 = '__tests__/__fixtures__/before.json';
// const pathToJson2 = '__tests__/__fixtures__/after.json';
//
// const pathToYml1 = '__tests__/__fixtures__/before.yml';
// const pathToYml2 = '__tests__/__fixtures__/after.yml';
//
// test('Compare Json files', () => {
//   expect(genDiff(pathToJson1, pathToJson2)).toBe(expected);
// });
//
// test('Compare YML files', () => {
//   expect(genDiff(pathToYml1, pathToYml2)).toBe(expected);
// });


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
  '.genDiff(%s,%s)',
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
  '.genDiff(%s,%s)',
  (path1, path2) => {
    expect(genDiff(path1, path2)).toBe(expectedBig);
  },
);
