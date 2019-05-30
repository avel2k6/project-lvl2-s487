import _ from 'lodash';
import getData from './parsers';
import getFormatter from './formatters';

const getChanges = (first, second) => {
  if (first === second) return { result: 'former', old: first };
  if (first === undefined && second !== undefined) return { result: 'added', new: second };
  if (first !== undefined && second === undefined) return { result: 'deleted', old: first };
  return { result: 'modified', old: first, new: second };
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
  const file1Data = getData(pathToFile1);
  const file2Data = getData(pathToFile2);

  const ast = makeAst(file1Data, file2Data);
  const render = getFormatter(options);
  const renderText = render(ast);
  // console.log(JSON.stringify(ast, null, ' '));
  return renderText;
};

export default genDiff;
