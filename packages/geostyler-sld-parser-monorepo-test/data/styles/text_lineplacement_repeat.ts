import { Style } from '../../../geostyler-style-monorepo-test/dist';

const lineStyledLabel: Style = {
  name: 'Simple Text',
  rules: [{
    name: '',
    symbolizers: [{
      color: '#000000',
      kind: 'Text',
      label: 'myText',
      placement: 'line',
      repeat: 100
    }],
  }]
};

export default lineStyledLabel;
