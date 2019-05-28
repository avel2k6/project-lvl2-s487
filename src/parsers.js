import fs from 'fs';
import path from 'path';

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
        type: '.yaml',
        parser: arg => arg instanceof Array,
      },

    ];

    const findParser = extname => parserFunctions.find(({ type }) => extname === type);
    const { parser } = findParser(this.extname);
    return parser;
  }

  getData() {
    // const fileContent = fs.readFileSync(this.pathToFile, 'utf8');
    // const fileData = JSON.parse(fileContent);
    // return fileData;
    const parser = this.getParser();
    const fileData = parser(this.pathToFile);
    return fileData;
  }
}
