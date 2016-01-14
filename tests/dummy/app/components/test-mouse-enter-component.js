import Ember from 'ember';
import layout from '../templates/components/test-mouse-enter-component';

export default Ember.Component.extend({
  layout: layout,
  mouseEnter() { console.log('mouseEnter was fired inside test-mouse-enter-component'); }
});
