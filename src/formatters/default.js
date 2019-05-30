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

const getPropertyString = (el, depth) => {
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
      const propertyString = getPropertyString(element, depth);
      return _.has(element, 'children')
        ? [...acc, `${intent}${propertyString}: ${render(element.children, depth + 1)}`]
        : [...acc, `${intent}${propertyString}`];
    },
    [],
  );
  return `{\n${result.join('\n')}\n${intent}}`;
};

export default render;
