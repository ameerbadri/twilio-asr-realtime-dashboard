/*! ${name}.js ${version}

#include "LICENSE.md"
 */
/* eslint strict:0 */
(function(root) {
  var component = require('./twilio-common-bundle');
  /* globals define */
  if (typeof define === 'function' && define.amd) {
    define([], function() { return component; });
  } else {
    var Twilio = root.Twilio = root.Twilio || {};
    for (var componentName in component) {
      Twilio[componentName] = component[componentName];
    }
  }
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
