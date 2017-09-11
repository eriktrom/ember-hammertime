/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-hammertime',

  included(app) {
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

  isDevelopingAddon() {
    return false;
  },

  projectConfig() {
    return this.project.config(process.env.EMBER_ENV);
  },

  setupPreprocessorRegistry(type, registry) {
    let { TouchActionSupport, setConfigValues } = require('./htmlbars-plugins/touch-action');
    let config = this.projectConfig()['EmberHammertime'];
    setConfigValues(config);

    registry.add('htmlbars-ast-plugin', {
      name: 'touch-action',
      plugin: TouchActionSupport,
      baseDir() {
        return __dirname;
      }
    });
  }

};
