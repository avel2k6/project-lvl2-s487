import _ from 'lodash';

const getIndent = depth => '  '.repeat(depth);

const stringify = (obj, depth) => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const keys = _.keys(obj);
  const indent = getIndent(depth);
  const keysColl = keys.map(el => `${indent}   ${el}: ${obj[el]}`);
  return `{\n${keysColl}\n${indent}}`;
};

const nodeHandlers = new Map([

  [
    'parental',
    (node, depth, func) => `  ${node.key}: ${func(node.children, depth + 1)}`,
  ],
  [
    'unchanged',
    (node, depth) => `  ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
  ],
  [
    'deleted',
    (node, depth) => `- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
  ],
  [
    'added',
    (node, depth) => `+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
  ],
  [
    'modified',
    (node, depth) => [
      `- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
      `+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
    ],
  ],
]);

const getPropertyString = (node, depth, func) => {
  const toString = nodeHandlers.get(node.type);
  return toString(node, depth, func);
};

const render = (astObj, depth = 0) => {
  const intent = getIndent(depth);
  const result = astObj.reduce(
    (acc, node) => {
      const propertyString = getPropertyString(node, depth, render);
      return _.flatten([...acc, propertyString]);
    },
    [],
  );
  const resultWithIntents = result.map(element => `${intent}${element}`);
  return `{\n${resultWithIntents.join('\n')}\n${intent}}`;
};

export default render;
