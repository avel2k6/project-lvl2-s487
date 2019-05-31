import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getData from './parsers';
import getFormatter from './formatters';


const makeNode = (obj1, obj2, key) => {
  const nodeRoot = { key, type: '', children: [] };

  if (_.has(obj1, key) && !_.has(obj2, key)) {
    return { ...nodeRoot, type: 'deleted', oldValue: obj1[key] };
  }
  if (!_.has(obj1, key) && _.has(obj2, key)) {
    return { ...nodeRoot, type: 'added', newValue: obj2[key] };
  }
  if (obj1[key] === obj2[key]) {
    return { ...nodeRoot, type: 'unchanged', oldValue: obj1[key] };
  }
  return {
    ...nodeRoot, type: 'modified', oldValue: obj1[key], newValue: obj2[key],
  };
};


const makeAst = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  // console.log(allKeys);
  return allKeys.reduce(
    (acc, key) => {
      const node = makeNode(obj1, obj2, key);
      return (typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
        ? [...acc, { ...node, type: 'parental', children: makeAst(obj1[key], obj2[key]) }]
        : [...acc, { ...node }];
    },
    [],
  );
};

const readFile = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf8');
  const fileExtname = path.extname(pathToFile);
  return { fileContent, fileExtname };
};

const genDiff = (pathToFile1, pathToFile2, options = 'default') => {
  const inputData1 = readFile(pathToFile1);
  const inputData2 = readFile(pathToFile2);

  const parsedData1 = getData(inputData1);
  const parsedData2 = getData(inputData2);

  const ast = makeAst(parsedData1, parsedData2);
  const render = getFormatter(options);
  const renderText = render(ast);
  // console.log(JSON.stringify(ast, null, '  '));
  return renderText;
};

export default genDiff;
