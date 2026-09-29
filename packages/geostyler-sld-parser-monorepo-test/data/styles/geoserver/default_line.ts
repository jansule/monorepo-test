import { Style } from 'geostyler-style-monorepo-test';

const style: Style = {
  name: 'default_line',
  rules: [
    {
      name: 'Blue Line',
      symbolizers: [
        {
          kind: 'Line',
          color: '#0000FF'
        }
      ]
    }
  ]
};


export default style;
