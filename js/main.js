CUORE.Dom.ready(function() {
  var currentLocale = (navigator.language || navigator.browserLanguage);

  document.labels = {};
  document.labels[currentLocale] = {
    "a.key": "a literal",
  };

  FIRST_NAMES = [
    "Big", "Long", "Short", "Small", "Slow", "Fast"
  ];

  MIDDLE_NAMES = [
    "Horny", "Stupid", "Red", "Blue", "Yellow", "Awful"
  ];

  LAST_NAMES = [
    "Panda", "Fox", "Parrot", "Armadillo", "Babirusa", "Condor", "Porcupine", "Peacock"
  ];

  CUORE.Bus.enableDebug();

  document.page = new FirstTime(CUORE.LocalStorageStatePersister());

  document.page.draw();
});