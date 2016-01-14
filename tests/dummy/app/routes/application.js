import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    foo() { console.log("Foo action fired inside application route"); }
  }
});
