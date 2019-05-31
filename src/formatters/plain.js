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
  const oldValue = (_.has(node, 'oldValue'))
    ? stringify(node.oldValue)
    : '';
  const newValue = (_.has(node, 'newValue'))
    ? stringify(node.newValue)
    : '';

  const typeDescriptions = new Map([
    ['parental', ''],
    ['unchanged', ''],
    ['deleted', `Property '${path}${node.key}' was removed`],
    ['added', `Property '${path}${node.key}' was added with value: ${newValue}`],
    ['modified', `Property '${path}${node.key}' was updated. From ${oldValue} to ${newValue}`],
  ]);

  return typeDescriptions.get(node.type);
};


const render = (astObj, path = '') => {
  const changedStrings = astObj.reduce(
    (acc, node) => {
      const propertyString = getPropertyString(node, path);
      return (node.type === 'parental')
        ? [...acc, propertyString, render(node.children, `${path}${node.key}.`)]
        : [...acc, propertyString];
    },
    [],
  );
  const renderResult = changedStrings.filter(string => string).join('\n'); // filter(string => string)
  return renderResult;
};

export default render;
