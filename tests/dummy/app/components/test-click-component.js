import Ember from 'ember';
import layout from '../templates/components/test-click-component';

export default Ember.Component.extend({
  layout: layout,
  click() { console.log('Click was fired inside test-click-component'); }
});
