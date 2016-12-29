var Subscribable = function() {
  this.SERVICE = 'A_SERVICE';

  this._subscribeTo = function(topic, handler){
    this.checkService();

    Bus.subscribe({
      channel: this.SERVICE,
      topic: topic,
      callback: handler.bind(this)
    });
  };

  this._publishAs = function(topic, data){
    this.checkService();

    Bus.publish({
      channel: this.SERVICE,
      topic: topic,
      data: data
    });
  };

  this.checkService = function() {
    if (this.SERVICE == 'A_SERVICE') {
      throw('SERVICE is not configured');
    }
  }
};
