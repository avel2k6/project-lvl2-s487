import genDiff from '../src';

const pathToFile1 = '__tests__/__fixtures__/before.json';
const pathToFile2 = '__tests__/__fixtures__/after.json';

genDiff(pathToFile1, pathToFile2);
