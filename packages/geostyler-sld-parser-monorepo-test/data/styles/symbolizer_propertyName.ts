import { Style } from '../../../geostyler-style-monorepo-test/dist';

const symbolizer_propertyName: Style = {
  name: 'PropertyName',
  rules: [
    {
      name: 'Style Rule 0',
      symbolizers: [{
        kind: 'Fill',
        color: {
          name: 'property',
          args: ['color_prop']
        }
      }]
    }
  ]
};

export default symbolizer_propertyName;
