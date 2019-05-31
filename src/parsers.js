import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (fileExtname) => {
  const parserFunctions = new Map([
    ['.json', content => JSON.parse(content)],
    ['.yml', content => yaml.safeLoad(content)],
    ['.ini', content => ini.parse(content)],
  ]);

  const parser = parserFunctions.get(fileExtname);
  return parser;
};

const getData = (inputData) => {
  const { fileContent, fileExtname } = inputData;
  const parser = getParser(fileExtname);
  const fileData = parser(fileContent);
  return fileData;
};

export default getData;
