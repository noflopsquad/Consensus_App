var Service = Class.extend(function() {
  this.SERVICE = 'A_CHANNEL';

  this.constructor = function() {
    Subscribable.call(Service.prototype);

    this._subscribe();
  };

  this._subscribe = function() {
  };

  this._beforeHit = function(message) {
    return message;
  };

  this._beforePublish = function(response) {
    return response.body.answer || {};
  };

  this.structureMessage = function(question) {
    var message = {};
    message.header = {};
    message.body = {};
    message.body.question = question || {};

    return message;
  };

  this.hit = function(endpoint,payload,topic) {
    var message = this.structureMessage(payload);
    message = this._beforeHit(message);
    aja()
      .method('POST')
      .header('Content-Type', 'application/json')
      .url(endpoint)
      .data(message)
      .on('200', this.buildCallback(topic))
      .go();
  };

  this.buildCallback = function(topic){
    return function(response){
      response = this._beforePublish(response);
      Bus.publish({
        channel: this.SERVICE,
        topic: topic,
        data: response
      });
    }.bind(this);
  };
});
