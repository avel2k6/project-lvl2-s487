// import fs from 'fs';
import _ from 'lodash';
import Parsers from './parsers';

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = new Parsers(pathToFile1);
  const file2 = new Parsers(pathToFile2);

  const file1Data = file1.getData();
  const file2Data = file2.getData();
  const allKeysData = { ...file1Data, ...file2Data };

  const compareAllKeys = (acc, value, key) => {
    if (_.has(file1Data, key) && _.has(file2Data, key)) {
      return file1Data[key] === file2Data[key]
        ? [...acc, `   ${key}: ${value}`]
        : [...acc, ` + ${key}: ${file2Data[key]}`, ` - ${key}: ${file1Data[key]}`];
    }
    if (!_.has(file1Data, key) && _.has(file2Data, key)) {
      return [...acc, ` + ${key}: ${value}`];
    }
    return [...acc, ` - ${key}: ${value}`];
  };

  const diffCollection = _.reduce(allKeysData, compareAllKeys, '');
  const diffString = `{\n${diffCollection.join('\n')}\n}`;

  return diffString;
};

export default genDiff;
