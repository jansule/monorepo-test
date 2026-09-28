import { Style } from '../../../../geostyler-style-monorepo-test/dist';

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
