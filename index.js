/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-hammertime',

  included: function (app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (typeof app.import !== 'function') {
      throw new Error('Ember-Hammertime is being used within another addon or engine ' +
        'and is having trouble registering itself to the parent application.');
    }
  },

  isDevelopingAddon: function() {
    return false;
  },

  projectConfig: function () {
    return this.project.config(process.env.EMBER_ENV);
  },

  setupPreprocessorRegistry: function(type, registry) {
    var TouchAction = require('./htmlbars-plugins/touch-action');
    var config = this.projectConfig()['EmberHammertime'];

    registry.add('htmlbars-ast-plugin', {
      name: "touch-action",
      plugin: TouchAction.getBoundPlugin(config),
      baseDir: function() {
        return __dirname;
      }
    });

  }

};
