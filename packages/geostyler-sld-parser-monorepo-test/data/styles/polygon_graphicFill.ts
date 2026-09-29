import { Style } from 'geostyler-style-monorepo-test';

const polygonGraphicFill: Style = {
  name: 'Polygon Graphic Fill',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Fill',
      color: '#000080',
      outlineColor: '#FFFFFF',
      outlineWidth: 2,
      outlineDasharray: [1, 0],
      graphicFill: {
        kind: 'Mark',
        wellKnownName: 'circle',
        color: '#FF0000'
      }
    }]
  }]
};

export default polygonGraphicFill;
