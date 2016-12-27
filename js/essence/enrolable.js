var Enrolable = function() {
  this.ENSEMBLE = 'A_ENSEMBLE';

  this._reactTo = function(topic, handler){
    this.checkEnsemble();

    Bus.subscribe({
      channel: this.ENSEMBLE,
      topic: topic,
      callback: handler.bind(this)
    });
  };

  this._announce = function(topic, data){
    this.checkEnsemble();

    Bus.publish({
      channel: this.ENSEMBLE,
      topic: topic,
      data: data
    });
  };

  this.checkEnsemble = function() {
    if (this.ENSEMBLE == 'A_ENSEMBLE') {
      throw('ENSEMBLE is not configured');
    }
  }
};