import Ember from 'ember';
import layout from '../templates/components/multiple-attribute-bindings-test';

// const {
//   String: { htmlSafe },
//   computed
// } = Ember;

export default Ember.Component.extend({
  layout,
  title: null,
  isOdd: true,

  // attributeBindings: ['colorStyle:style'],
  // color: null,
  // TODO - flesh out this test to
  // colorStyle: computed({
  //   get() {
  //     let originalStyle = this.get('style');
  //     const color = this.get('color');

  //     if (!color) { return originalStyle; }

  //     if (!originalStyle || originalStyle.length === 0) {
  //       return htmlSafe(`background: ${color}`);
  //     } else {
  //       return htmlSafe(originalStyle += ` background: ${color}`);
  //     }
  //   }
  // }),

  click() {
    this.toggleProperty('isOdd');

    if (this.get('isOdd')) {
      this.set('title', 'Odds win');
      // this.set('color', 'blue'); // TODO - allow concatenating a background color
    } else {
      this.set('title', 'Evens Win');
    }
  }
});
