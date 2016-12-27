var Involved = Component.extend(function() {
  this.SERVICE = 'names';
  this.DOM_NODE = 'con-involved';
  
  this._subscribe = function(){
    this._subscribeTo('name.generated', this.displayName);
  };

  this.displayName= function(data,envelope){
    document.querySelector(this.DOM_NODE).setAttribute("handle",data);
  };

  this._start = function(){
    this._publishAs('generate.name');
  };



});