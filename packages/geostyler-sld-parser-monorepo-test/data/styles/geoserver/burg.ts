import { Style } from '../../../../geostyler-style-monorepo-test/dist';

const burg: Style = {
  name: 'burg',
  rules: [
    {
      name: 'Red flag',
      symbolizers: [
        {
          kind: 'Icon',
          image: 'burg02.svg',
          size: 20
        }
      ]
    }
  ]
};

export default burg;
