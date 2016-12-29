describe ('A Subscribable', function (){
  describe('when SERVICE is not configured', function(){
    var testSubscribable = Class.extend(function(){
      this.constructor = function() {
        Subscribable.call(testSubscribable.prototype);
      };
    });

    it ('informs by throwing an error on subscribe', function(){
      var aSubscribable = new testSubscribable();
      var noOperation = function () {};

      expect(function() {
        aSubscribable._subscribeTo('aTopic', noOperation)
      }).toThrow('SERVICE is not configured');
    });

    it ('informs by throwing an error on publish', function(){
      var aSubscribable = new testSubscribable();

      expect(function() {
        aSubscribable._publishAs('aTopic', {})
      }).toThrow('SERVICE is not configured');
    });
  });
});