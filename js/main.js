CUORE.Dom.ready(function() {
  var currentLocale = (navigator.language || navigator.browserLanguage);
  
  document.labels = {};
  document.labels[currentLocale] = {
      "a.key": "a literal",
  };
  
  CUORE.Bus.enableDebug();

  document.page = new FirstTime();

  document.page.draw();

  grande.bind(document.querySelectorAll("article"));
});
