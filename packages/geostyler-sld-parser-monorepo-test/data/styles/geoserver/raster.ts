import { Style } from 'geostyler-style-monorepo-test';

const style: Style = {
  name: 'default_raster',
  rules: [
    {
      name: 'Opaque Raster',
      symbolizers: [
        {
          kind: 'Raster',
          opacity: 1
        }
      ]
    }
  ]
};

export default style;
