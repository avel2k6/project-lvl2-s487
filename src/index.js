import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getFormatter from './formatters';


const getNodeTypes = [
  {
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    getNode: (obj1, obj2, key, func) => ({ type: 'parental', children: func(obj1[key], obj2[key]) }),
  },
  {
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    getNode: (obj1, obj2, key) => ({ type: 'deleted', oldValue: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    getNode: (obj1, obj2, key) => ({ type: 'added', newValue: obj2[key] }),
  },
  {
    check: (obj1, obj2, key) => (obj1[key] === obj2[key]),
    getNode: (obj1, obj2, key) => ({ type: 'unchanged', oldValue: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    getNode: (obj1, obj2, key) => ({ type: 'modified', oldValue: obj1[key], newValue: obj2[key] }),
  },
];

const makeNode = (obj1, obj2, key, func) => {
  const nodeRoot = { key, type: '', children: [] };
  const { getNode } = getNodeTypes.find(nodeType => nodeType.check(obj1, obj2, key));
  return { ...nodeRoot, ...getNode(obj1, obj2, key, func) };
};


const makeAst = (obj1, obj2) => {
  const allKeys = _.union(_.keys(obj1), _.keys(obj2));
  return allKeys.map(key => makeNode(obj1, obj2, key, makeAst));
};

const readFile = (pathToFile) => {
  const content = fs.readFileSync(pathToFile, 'utf8');
  const extname = path.extname(pathToFile);
  return { content, extname };
};

const genDiff = (pathToFile1, pathToFile2, options) => {
  const fileData1 = readFile(pathToFile1);
  const fileData2 = readFile(pathToFile2);

  const parsedData1 = getParser(fileData1.extname)(fileData1.content);
  const parsedData2 = getParser(fileData2.extname)(fileData2.content);

  const ast = makeAst(parsedData1, parsedData2);
  const render = getFormatter(options);
  const renderedText = render(ast);
  // console.log(JSON.stringify(ast, null, '  '));
  return renderedText;
};

export default genDiff;
