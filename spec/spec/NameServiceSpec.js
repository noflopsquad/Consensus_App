"use strict";

describe("NameService", function() {

    FIRST_NAMES = [
      "Jon","Alfred", "Mary"
    ];

    MIDDLE_NAMES = [
      "Bon","Penny", "Pickford"
    ];

    LAST_NAMES = [
      "Jovi","Weather", "Smith"
    ];

    var aNameService;
    var baseURL = "http://www.google.com";
    var SECOND_ARGUMENT = 1


    beforeEach(function() {

        aNameService = new Names();
        aNameService.setBaseURL(baseURL);
    });


    it("inherits Service", function() {
        expect(aNameService).toEqual(jasmine.any(CUORE.Service));
    });

    it('composes a three part randomized name', function() {
      var generatedName = retrieveGeneratedName();
      expect(generatedName.split(" ").length).toEqual(3);

    });

    describe('when a name is generated', function() {

        it('name comes from the apropiate list', function() {
          var generatedName = retrieveGeneratedName();
          var name = generatedName.split(" ")[0]
          expect(FIRST_NAMES).toContain(name);
        });

        it('middle name comes from the apropiate list', function() {
          var generatedName = retrieveGeneratedName();
          var middle = generatedName.split(" ")[1]
          expect(MIDDLE_NAMES).toContain(middle);
        });

        it('last name comes from the apropiate list', function() {
          var generatedName = retrieveGeneratedName();
          var last = generatedName.split(" ")[2]
          expect(LAST_NAMES).toContain(last);
        });

    });

    var retrieveGeneratedName = function() {
      spyOn(CUORE.Bus, "emit");
      aNameService.execute("generate",null);

      var generatedName = CUORE.Bus.emit.calls.mostRecent().args[SECOND_ARGUMENT];
      return generatedName;
    };
});