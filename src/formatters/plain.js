import _ from 'lodash';

const stringify = (data) => {
  const dataType = typeof data;
  switch (dataType) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${data}'`;
    default:
      return `${data}`;
  }
};

const getPropertyString = (node, path) => {
  if (!_.has(node, 'changes')) {
    return '';
  }
  const { result } = node.changes;
  const oldValue = (node.changes.old !== undefined)
    ? stringify(node.changes.old)
    : '';
  const newValue = (node.changes.new !== undefined)
    ? stringify(node.changes.new)
    : '';
  switch (result) {
    case 'added':
      return `Property '${path}${node.key}' was added with value: ${newValue}`;
    case 'deleted':
      return `Property '${path}${node.key}' was removed`;
    case 'modified':
      return `Property '${path}${node.key}' was updated. From ${oldValue} to ${newValue}`;
    default:
      break;
  }
  return '';
};


const render = (astObj, path = '') => {
  const changedStrings = astObj.reduce(
    (acc, node) => {
      const propertyString = getPropertyString(node, path);
      return _.has(node, 'children')
        ? [...acc, propertyString, render(node.children, `${path}${node.key}.`)]
        : [...acc, propertyString];
    },
    [],
  );
  const renderResult = changedStrings.filter(string => string).join('\n');
  return renderResult;
};

export default render;
