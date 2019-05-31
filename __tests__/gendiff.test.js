import fs from 'fs';
import genDiff from '../src';


const readFile = path => fs.readFileSync(path).toString().trim();

const expected = '__tests__/__fixtures__/expected.txt';
const expectedBig = '__tests__/__fixtures__/expected-big.txt';
const expectedPlain = '__tests__/__fixtures__/expected-plain.txt';
const expectedJson = '__tests__/__fixtures__/expected-json.txt';


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
    expect(genDiff(path1, path2)).toBe(readFile(expected));
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
    expect(genDiff(path1, path2)).toBe(readFile(expectedBig));
  },
);


test.each([testJsonBig, testYamlBig, testIniBig])(
  'Big files to genDiff(%s,%s) with plain option',
  (path1, path2) => {
    expect(genDiff(path1, path2, 'plain')).toBe(readFile(expectedPlain));
  },
);

test.each([testJsonBig, testYamlBig, testIniBig])(
  'Big files to genDiff(%s,%s) with "plain" option',
  (path1, path2) => {
    expect(genDiff(path1, path2, 'plain')).toBe(readFile(expectedPlain));
  },
);

test.each([testJsonBig, testYamlBig])(
  'Big files to genDiff(%s,%s) with "json" option',
  (path1, path2) => {
    expect(genDiff(path1, path2, 'json')).toBe(readFile(expectedJson));
  },
);

// test('Simular AST from different types', () => {
//   expect(genDiff(
//     '__tests__/__fixtures__/before-big.ini',
//     '__tests__/__fixtures__/after-big.ini',
//     'json',
//   ))
//     .toBe(genDiff(
//       '__tests__/__fixtures__/before-big.json',
//       '__tests__/__fixtures__/after-big.json',
//       'json',
//     ));
// });
