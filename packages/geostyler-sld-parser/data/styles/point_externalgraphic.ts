import { Style } from 'geostyler-style-monorepo-test';

const pointExternalGraphic: Style = {
  name: 'External Graphic',
  rules: [{
    name: '',
    symbolizers: [{
      kind: 'Icon',
      image: 'http://geoserver.org/img/geoserver-logo.png',
      size: 10,
      rotate: 90
    }]
  }]
};

export default pointExternalGraphic;
