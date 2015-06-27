"use strict";

CUORE.NullStatePersister = (function() {
  return function() {
    return {
      save: function(key, value) {

      },
      retrieve: function(key) {

      },
      remove: function(key) {

      }
    };
  };
})();