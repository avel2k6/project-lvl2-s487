import yaml from 'js-yaml';
import ini from 'ini';

export default (fileExtname) => {
  const parserFunctions = new Map([
    ['.json', JSON.parse],
    ['.yml', yaml.safeLoad],
    ['.ini', ini.parse],
  ]);

  const parser = parserFunctions.get(fileExtname);
  // console.log('ext ' + fileExtname);
  // console.log(parser);
  return parser;
};
