var Dropdown = Component.extend(function(parent) {
  this.SERVICE = 'catalog';

  this.constructor = function(settings) {
    this.catalog = settings.catalog;
    this.id = settings.id;
    this.signal = settings.signal;
    this.beautifier = settings.beautifier;

    parent.constructor.call(this);
  };

  this._subscribe = function() {
    this._subscribeTo(this.catalog + '.available', this.setUp);
    this._reactTo('card.enable', this.initializeSelectedValue);
  };

  this.initializeSelectedValue = function(data, envelope) {
    var theCase = data.case;
    var configuration = this.buildConfiguration();

    Renderer.Dropdown.setDataSelectedValue(configuration, theCase[this.signal]);
  };

  this._start = function() {
    this.alreadySetUp = false;
    this.askCatalog();
  };

  this.askCatalog = function() {
    var topic = 'ask.' + this.catalog;
    this._publishAs(topic);
  };

  this.setUp = function(data, envelope){
    if (this.alreadySetUp) return;

    var sortedOptions = data[this.catalog].sort();
    var configuration = this.buildConfiguration(sortedOptions);

    Renderer.Dropdown.create(configuration);

    this.alreadySetUp = true;
  };

  this.inform = function(value, text) {
    var data = {};
    data[this.signal] = value;
    var configuration = this.buildConfiguration();

    Renderer.Dropdown.setDataSelectedValue(configuration, value);
    this._announce(this.topic, data);
  };

  this.buildConfiguration = function(options) {
    var common = {
      id: this.id,
      options: options,
      beautifier: this.beautifier,
      onChange: this.inform.bind(this)
    };

    return merge(common, this.additionalConfiguration());
  };

  this.additionalConfiguration = function() {
    return {};
  };

  var merge = function(target, source) {
    var output = {};

    for (var key in target) {
      if (target.hasOwnProperty(key)) {
        output[key] = target[key];
      }
    }

    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        output[key] = source[key];
      }
    }

    return output;
  };
});
