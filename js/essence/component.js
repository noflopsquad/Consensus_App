var Component = Class.extend(function() {
  this.constructor = function() {
    Subscribable.call(Component.prototype);
    Enrolable.call(Component.prototype);

    this._subscribe();
    this._start();
  };

  this._subscribe = function() {
  };

  this._start = function() {
  };

  this._broadcast = function(topic){
    this._subscribeTo(topic, function(data, envelope){
      this._announce(envelope.topic, data);
    }.bind(this));
  }
});