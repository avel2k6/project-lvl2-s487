// import fs from 'fs';
import _ from 'lodash';
import Parsers from './parsers';

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

const getIndent = depth => '  '.repeat(depth);

const stringify = (obj, depth) => {
  if (typeof obj !== 'object') {
    return `${obj.toString()}`;
  }
  const keys = Object.keys(obj);
  const indent = getIndent(depth);
  const keysColl = keys.reduce(
    (acc, el) => ([...acc, `${indent}   ${el}: ${obj[el]}`]),
    '',
  );
  return `{\n${keysColl}\n${indent}}`;
};

const getString = (el, depth) => {
  const intent = getIndent(depth);
  if (_.has(el, 'changes')) {
    const { result } = el.changes;
    const oldValue = (el.changes.old !== undefined)
      ? stringify(el.changes.old, depth + 1)
      : '';
    const newValue = (el.changes.new !== undefined)
      ? stringify(el.changes.new, depth + 1)
      : '';
    switch (result) {
      case 'former':
        return `  ${el.key}: ${oldValue}`;
      case 'deleted':
        return `- ${el.key}: ${oldValue}`;
      case 'modified':
        return `- ${el.key}: ${oldValue}\n${intent}+ ${el.key}: ${newValue}`;
      default:
        return `+ ${el.key}: ${newValue}`;
    }
  }
  return `  ${el.key}`;
};

const render = (astObj, depth = 0) => {
  const intent = getIndent(depth);
  const result = astObj.reduce(
    (acc, element) => {
      const string = getString(element, depth);
      return _.has(element, 'children')
        ? [...acc, `${intent}${string}: ${render(element.children, depth + 1)}`]
        : [...acc, `${intent}${string}`];
    },
    [],
  );
  return `{\n${result.join('\n')}\n${intent}}`;
};

const genDiff = (pathToFile1, pathToFile2) => {
  const file1 = new Parsers(pathToFile1);
  const file2 = new Parsers(pathToFile2);

  const file1Data = file1.getData();
  const file2Data = file2.getData();

  // console.log('-------');

  const ast = makeAst(file1Data, file2Data);
  const res = render(ast);
  // console.log(JSON.stringify(ast, null, ' '));
  return res;
};

export default genDiff;
