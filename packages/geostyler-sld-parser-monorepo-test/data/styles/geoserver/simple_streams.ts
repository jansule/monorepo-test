import { Style } from 'geostyler-style-monorepo-test';

const style: Style = {
  name: 'Simple Streams',
  rules: [
    {
      name: 'Blue Line',
      symbolizers: [
        {
          kind: 'Line',
          color: '#003EBA',
          width: 2
        }
      ]
    }
  ]
};

export default style;
