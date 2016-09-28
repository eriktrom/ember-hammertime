import Ember from 'ember';
import layout from '../templates/components/multiple-attribute-bindings-test';

const {
  computed
} = Ember;

export default Ember.Component.extend({
  layout,

  attributeBindings: ['titleText:title'],
  titleText: computed('isOdd', {
    get() {
      if (this.get('isOdd') === null) { return null; }
      if (this.get('isOdd')) { return 'wow its odd today'; }
      else { return 'now its odd im saying its even today'; }
    }
  }),

  isOdd: null,

  click() {
    if (this.get('odd') === null) { return true; }
    return this.toggleProperty('isOdd');
  },
});
