var Main = Page.extend(function () {
  this._servicesUp = function() {
    new Names();
  };

  this._componentsUp = function() {
    new Involved();
  };

  this._UIUp = function() {
    console.log('RRRRRRRuning');
  };
});

window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false);
    new Main();
},false);