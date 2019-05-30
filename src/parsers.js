import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getParser = (pathToFile) => {
  const fileExtname = path.extname(pathToFile);
  const parserFunctions = [
    {
      type: '.json',
      parser: content => JSON.parse(content),
    },
    {
      type: '.yml',
      parser: content => yaml.safeLoad(content),
    },
    {
      type: '.ini',
      parser: content => ini.parse(content),
    },
  ];
  const findParser = extname => parserFunctions.find(({ type }) => extname === type);
  const { parser } = findParser(fileExtname);
  return parser;
};

const getData = (pathToFile) => {
  const fileContent = fs.readFileSync(pathToFile, 'utf8');
  const parser = getParser(pathToFile);
  const fileData = parser(fileContent);
  return fileData;
};

export default getData;
