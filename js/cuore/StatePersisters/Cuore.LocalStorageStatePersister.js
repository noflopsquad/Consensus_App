"use strict";

CUORE.LocalStorageStatePersister = (function() {
  return function() {
    return {
      save: function(key, value) {
        window.localStorage.setItem(key, value);
      },

      retrieve: function(key) {
        return window.localStorage.getItem(key);

      },

      remove: function(key) {
        window.localStorage.removeItem(key);
      }
    };
  };
})();