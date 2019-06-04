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

const nodeHandlers = new Map([
  [
    'parental',
    (node, path, func) => func(node.children, `${path}${node.key}.`),
  ],
  [
    'unchanged',
    () => '',
  ],
  [
    'deleted',
    (node, path) => `Property '${path}${node.key}' was removed`,
  ],
  [
    'added',
    (node, path) => `Property '${path}${node.key}' was added with value: ${stringify(node.newValue)}`,
  ],
  [
    'modified',
    (node, path) => `Property '${path}${node.key}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`],
]);

const getPropertyString = (node, path, func) => {
  const toString = nodeHandlers.get(node.type);
  return toString(node, path, func);
};

const render = (astObj, path = '') => {
  const changedStrings = astObj.reduce(
    (acc, node) => {
      const propertyString = getPropertyString(node, path, render);
      return [...acc, propertyString];
    },
    [],
  );
  const renderResult = changedStrings.filter(string => string).join('\n'); // filter(string => string)
  return renderResult;
};

export default render;
