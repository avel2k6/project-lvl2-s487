import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default class Parsers {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
    this.extname = path.extname(this.pathToFile);
  }

  getParser() {
    const parserFunctions = [
      {
        type: '.json',
        parser: (filePath) => {
          const content = fs.readFileSync(filePath, 'utf8');
          const data = JSON.parse(content);
          return data;
        },
      },
      {
        type: '.yml',
        parser: (filePath) => {
          const content = fs.readFileSync(filePath, 'utf8');
          const data = yaml.safeLoad(content);
          return data;
        },
      },
    ];

    const findParser = extname => parserFunctions.find(({ type }) => extname === type);
    const { parser } = findParser(this.extname);
    return parser;
  }

  getData() {
    const parser = this.getParser();
    const fileData = parser(this.pathToFile);
    return fileData;
  }
}
