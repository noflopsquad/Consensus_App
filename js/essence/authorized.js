var Authorized = Service.extend(function(){

  this._beforeHit = function(message) {
    message.header.session_token = Session.token();

    return message;
  };

  this._beforePublish = function(response) {
    var data = response.body.answer || {};
    data.end_of_session = response.header.end_of_session;

    this.interpret(data);
    return data;
  };

  this.interpret = function(response) {
    if (response.error === 'unauthorized') {
      this.notifyUnauthorized();
      return;
    }

    this.informTimeout(response);
  };

  this.informTimeout = function(response) {
    Bus.publish({
      channel: 'auth',
      topic: 'end_of_session.delayed',
      data: { end_of_session: response.end_of_session }
    });
  };

  this.notifyUnauthorized = function() {
    Bus.publish({
      channel: 'auth',
      topic: 'session.invalid'
    });
  };
});
