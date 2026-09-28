import { Style } from '../../../geostyler-style-monorepo-test/dist';

const pointStyledLabel: Style = {
  name: 'Simple Text',
  rules: [{
    name: '',
    symbolizers: [{
      color: '#000000',
      kind: 'Text',
      label: 'myText',
      placement: 'line'
    }]
  }]
};

export default pointStyledLabel;
