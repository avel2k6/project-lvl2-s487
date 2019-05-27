import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const file1Content = fs.readFileSync(pathToFile1, 'utf8');
  const file2Content = fs.readFileSync(pathToFile2, 'utf8');

  const file1Data = JSON.parse(file1Content);
  const file2Data = JSON.parse(file2Content);
  const allKeysData = { ...file1Data, ...file2Data };

  const compareAllKeys = (result, value, key) => {
    if (_.has(file1Data, key) && _.has(file2Data, key)) {
      return file1Data[key] === file2Data[key]
        ? `${result}\n   ${key}: ${value}`
        : `${result}\n + ${key}: ${file2Data[key]}\n - ${key}: ${file1Data[key]}`;
    }
    if (!_.has(file1Data, key) && _.has(file2Data, key)) {
      return `${result}\n + ${key}: ${value}`;
    }
    return `${result}\n - ${key}: ${value}`;
  };

  const comparedKeysString = _.reduce(allKeysData, compareAllKeys, '');
  const result = `{${comparedKeysString}\n}\n`;
  return result;
};

export default genDiff;
