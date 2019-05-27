import fs from 'fs';
import genDiff from '../src';

const pathToFile1 = '__tests__/__fixtures__/before.json';
const pathToFile2 = '__tests__/__fixtures__/after.json';
const jsonExpected = fs.readFileSync('__tests__/__fixtures__/jsonExpected.txt').toString();

test('Compare Json files', () => {
  expect(genDiff(pathToFile1, pathToFile2)).toBe(jsonExpected);
});
