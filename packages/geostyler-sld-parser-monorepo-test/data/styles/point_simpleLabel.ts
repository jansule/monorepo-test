import { Style } from '../../../geostyler-style-monorepo-test/dist';

const pointStyledLabel: Style = {
  name: 'Styled Label',
  rules: [{
    name: '',
    symbolizers: [{
      color: '#000000',
      kind: 'Text',
      label: 'myText'
    }]
  }]
};

export default pointStyledLabel;
