var Bus = {
  subscribe: function(envelope){postal.subscribe(envelope);},
  publish: function(envelope){postal.publish(envelope);},
  debug: function(channel){
    postal.subscribe({
      channel: channel,
      topic: '*.*',
      callback: function(data,envelope){
        console.log('Envelope: ',envelope);
        console.log('Data: ',data);
      }
    });
  }
};
