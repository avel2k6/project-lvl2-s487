import defaultFormatter from './default';
import plainFormatter from './plain';

const getFormatter = (options) => {
  switch (options) {
    case 'plain':
      return plainFormatter;
    default:
      return defaultFormatter;
  }
};

export default getFormatter;
