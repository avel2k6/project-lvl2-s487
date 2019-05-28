import fs from 'fs';
import genDiff from '../src';

const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt').toString().trim();

const pathToJson1 = '__tests__/__fixtures__/before.json';
const pathToJson2 = '__tests__/__fixtures__/after.json';

const pathToYml1 = '__tests__/__fixtures__/before.yml';
const pathToYml2 = '__tests__/__fixtures__/after.yml';

test('Compare Json files', () => {
  expect(genDiff(pathToJson1, pathToJson2)).toBe(expected);
});

test('Compare YML files', () => {
  expect(genDiff(pathToYml1, pathToYml2)).toBe(expected);
});
