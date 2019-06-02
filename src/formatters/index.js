import prettyFormatter from './pretty';
import plainFormatter from './plain';
import jsonFormatter from './json';

const getFormatter = (options) => {
  switch (options) {
    case 'plain':
      return plainFormatter;
    case 'json':
      return jsonFormatter;
    default:
      return prettyFormatter;
  }
};

export default getFormatter;
