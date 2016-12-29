var reconMatchers = {

  toBeLastTopic: function(util, customEqualityTesters){
    return {
      compare: function(topic) {
        spiedBus=Bus.publish;

        var lastTopic = function(spiedBus){
          var lastCall = spiedBus.calls.mostRecent();
          if (lastCall === undefined) { return ''; }

          return lastCall.args[0].topic;
        };
        var result = {};
        result.pass = util.equals(topic,lastTopic(spiedBus));
        result.message = topic + " wasn't the last topic"
        if (result.pass) result.message = topic + " was the last topic";
        return result
      }
    };
  },

  toBeLastTopicIn: function(util, customEqualityTesters){
    return {
      compare: function(topic,channel) {
        spiedBus=Bus.publish;

        var lastTopicIn = function(spiedBus,channel){
          var lastTopic='';
          spiedBus.calls.allArgs().forEach(function(args){
            var theArgs = args[0];
            if(theArgs.channel == channel)lastTopic = theArgs.topic;
          });
          return lastTopic;
        };
        var result = {};
        result.pass = util.equals(topic,lastTopicIn(spiedBus,channel));
        result.message = topic + " wasn't the last topic in "+channel;
        if (result.pass) result.message = topic + " was the last topic in "+channel;
        return result
      }
    };
  },

  toBeIncludedInDataAs: function(util, customEqualityTesters){
    return {
      compare: function(value,key) {
        spiedBus=Bus.publish;

        var lastData = function(spiedBus){
          var noData = {};
          var lastCall = spiedBus.calls.mostRecent();
          if (lastCall === undefined) { return noData; };

          var data = lastCall.args[0].data;
          if (data === undefined) { return noData; };

          return data;
        };

        var result = {};
        result.pass = util.equals(lastData(spiedBus)[key],value);
        result.message = value + " isn't included in data as "+ key;
        if (result.pass) result.message = value + " is included in data as "+ key;
        return result
      }
    };
  },

  toBeLastDataInChannel: function(util, customEqualityTesters){
    return {
      compare: function(value, key, channel) {
        spiedBus=Bus.publish;

        var lastCallInChannel = function() {
          var lastCall = undefined;
          spiedBus.calls.all().forEach(function(call){
            var theArgs = call.args[0];
            if(theArgs.channel == channel) {
              lastCall = call;
            }
          });
          return lastCall;
        }

        var dataIn = function(call) {
          var noData = {};
          if (call === undefined) { return noData; };

          var data = call.args[0].data;
          if (data === undefined) { return noData; };

          return data;
        }

        var result = {};
        var lastCall = lastCallInChannel();

        if (lastCall === undefined) {
          result.pass = false;
          result.message = "no topics were published in " + channel;
          return result;
        }

        var data = dataIn(lastCall);
        result.pass = util.equals(data[key], value);

        if (result.pass) {
          result.message = value + " is included as " + key + " in last data in channel " + channel;
        } else {
          result.message = value + " isn't included as " + key + " in last data in channel " + channel;
        }

        return result;
      }
    };
  },

  toHaveBeenSentTo: function(util, customEqualityTesters){
    return {
      compare: function(payload,url) {

        var lastUrl = function(){
          return jasmine.Ajax.requests.mostRecent().url;
        };

        var lastPayload = function(){
          var params = jasmine.Ajax.requests.mostRecent().params;
          return JSON.parse(decodeURI(params));
        };

        var result = {};
        result.pass = util.equals(lastPayload(),payload) && util.equals(lastUrl(),url) ;
        result.message = JSON.stringify(payload) +" wasn't sent to  "+ url;
        if (result.pass) result.message = JSON.stringify(payload) +" was sent to  "+ url;
        return result
      }
    };
  },

  toHaveSession: function(util, customEqualityTesters){
    return {
      compare: function(storage,sessionToken) {

        var result = {};
        result.pass = util.equals(storage.getItem('session_token'),sessionToken);
        result.message = sessionToken + ' is stored'
        if (result.pass) result.message = sessionToken + " isn't stored";
        return result
      }
    };
  }
};