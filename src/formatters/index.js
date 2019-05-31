import mainFormatter from './main';
import plainFormatter from './plain';
import jsonFormatter from './json';

const getFormatter = (options) => {
  switch (options) {
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    default:
      return mainFormatter;
  }
};

export default getFormatter;
