import { Style } from 'geostyler-style-monorepo-test';

const style: Style = {
  name: 'green',
  rules: [
    {
      name: '',
      symbolizers: [
        {
          kind: 'Fill',
          color: '#66FF66'
        }
      ]
    }
  ]
};

export default style;
