import { Style } from '../../../../geostyler-style-monorepo-test/dist';

const style: Style = {
  name: 'Default Line',
  rules: [
    {
      name: 'Green Line',
      symbolizers: [
        {
          kind: 'Line',
          color: '#319738',
          width: 2
        }
      ]
    }
  ]
};


export default style;
