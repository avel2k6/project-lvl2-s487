import _ from 'lodash';
import Parsers from './parsers';
import getFormatter from './formatters';

const getChanges = (a, b) => {
  if (a === b) return { result: 'former', old: a };
  if (a === undefined && b !== undefined) return { result: 'added', new: b };
  if (a !== undefined && b === undefined) return { result: 'deleted', old: a };
  return { result: 'modified', old: a, new: b };
};
const makeAst = (obj1, obj2) => {
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  return allKeys.reduce(
    (acc, key) => {
      const root = {
        key,
      };
      const changes = getChanges(obj1[key], obj2[key]);
      return (typeof obj1[key] === 'object' && typeof obj2[key] === 'object')
        ? [...acc, { ...root, children: makeAst(obj1[key], obj2[key]) }]
        : [...acc, { ...root, changes }];
    },
    [],
  );
};

const genDiff = (pathToFile1, pathToFile2, options = 'default') => {
  const file1 = new Parsers(pathToFile1);
  const file2 = new Parsers(pathToFile2);
  const file1Data = file1.getData();
  const file2Data = file2.getData();

  const ast = makeAst(file1Data, file2Data);
  const render = getFormatter(options);
  const renderText = render(ast);
  // console.log(JSON.stringify(ast, null, ' '));
  return renderText;
};

export default genDiff;
