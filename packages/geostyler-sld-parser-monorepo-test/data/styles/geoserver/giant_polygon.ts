import { Style } from '../../../../geostyler-style-monorepo-test/dist';

const style: Style = {
  name: 'area landmarks',
  rules: [
    {
      name: '',
      symbolizers: [
        {
          kind: 'Fill',
          color: '#DDDDDD',
          fillOpacity: 1
        }
      ]
    }
  ]
};

export default style;
