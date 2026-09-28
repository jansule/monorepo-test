import { Style } from '../../../../geostyler-style-monorepo-test/dist';

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
