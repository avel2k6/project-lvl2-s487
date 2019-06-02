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

const nodeHandlers = [
  {
    type: 'parental',
    toString: (node, depth, func) => `  ${node.key}: ${func(node.children, depth + 1)}`,
  },
  {
    type: 'unchanged',
    toString: (node, depth) => `  ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
  },
  {
    type: 'deleted',
    toString: (node, depth) => `- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
  },
  {
    type: 'added',
    toString: (node, depth) => `+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
  },
  {
    type: 'modified',
    toString: (node, depth) => `- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
  },
];

const getPropertyString = (node, depth, func) => {
  const { toString } = nodeHandlers.find(n => (n.type === node.type));
  return toString(node, depth, func);
};

const render = (astObj, depth = 0) => {
  const intent = getIndent(depth);
  const result = astObj.reduce(
    (acc, node) => {
      const propertyString = getPropertyString(node, depth, render);
      return [...acc, `${intent}${propertyString}`];
    },
    [],
  );
  return `{\n${result.join('\n')}\n${intent}}`;
};

export default render;
