import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default class Parsers {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.extname = path.extname(this.pathToFile);
  }

  getParser() {
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
    const { parser } = findParser(this.extname);
    return parser;
  }

  getData() {
    const fileContent = fs.readFileSync(this.pathToFile, 'utf8');
    const parser = this.getParser();
    const fileData = parser(fileContent);
    return fileData;
  }
}
