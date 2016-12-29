describe ('A Enrolable', function (){
  describe('when ENSEMBLE is not configured', function(){
    var testEnrolable = Class.extend(function(){
      this.constructor = function() {
        Enrolable.call(testEnrolable.prototype);
      };
    });

    it ('informs by throwing an error on react', function(){
      var aEnrolable = new testEnrolable();
      var noOperation = function () {};

      expect(function() {
        aEnrolable._reactTo('aTopic', noOperation)
      }).toThrow('ENSEMBLE is not configured');
    });

    it ('informs by throwing an error on announce', function(){
      var aEnrolable = new testEnrolable();

      expect(function() {
        aEnrolable._announce('aTopic', {})
      }).toThrow('ENSEMBLE is not configured');
    });
  });
});