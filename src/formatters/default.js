import _ from 'lodash';

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

const getPropertyString = (node, depth) => {
  const intent = getIndent(depth);

  const oldValue = (_.has(node, 'oldValue'))
    ? stringify(node.oldValue, depth + 1)
    : '';
  const newValue = (_.has(node, 'newValue'))
    ? stringify(node.newValue, depth + 1)
    : '';

  const typeDescriptions = new Map([
    ['parental', `  ${node.key}`],
    ['unchanged', `  ${node.key}: ${oldValue}`],
    ['deleted', `- ${node.key}: ${oldValue}`],
    ['added', `+ ${node.key}: ${newValue}`],
    ['modified', `- ${node.key}: ${oldValue}\n${intent}+ ${node.key}: ${newValue}`],
  ]);

  return typeDescriptions.get(node.type);
};

const render = (astObj, depth = 0) => {
  const intent = getIndent(depth);
  const result = astObj.reduce(
    (acc, node) => {
      const propertyString = getPropertyString(node, depth);
      return (node.type === 'parental')
        ? [...acc, `${intent}${propertyString}: ${render(node.children, depth + 1)}`]
        : [...acc, `${intent}${propertyString}`];
    },
    [],
  );
  return `{\n${result.join('\n')}\n${intent}}`;
};

export default render;
