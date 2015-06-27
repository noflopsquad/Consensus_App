"use strict";

describe("Core", function() {

    var head, scriptCore;

    beforeEach(function(done) {
        Array.prototype.indexOf = undefined;
        loadScript('../js/cuore/Cuore.Core.js', done);
    });

    afterEach(function() {
        head.removeChild(scriptCore);
    });

    it("provides array.indexOf if not present", function() {
        expect(Array.prototype.indexOf).toBeDefined();
    });

    it("provides a polyfilled array.indexOf that works on arrays without gaps", function() {
        expect([].indexOf('not-present-element')).toEqual(-1);
        expect(['element'].indexOf('element')).toEqual(0);
        expect(
            ['element', 'another element', 'yet one more'].indexOf('another element')
        ).toEqual(1);
    });

    it("provides a polyfilled array.indexOf that works on arrays with gaps", function() {
        var array = [];
        array[2] = 'another element';

        expect(array.indexOf('another element')).toEqual(2);
    });

    function loadScript(src, callback) {
        scriptCore = document.createElement('script');
        scriptCore.type = 'text/javascript';
        scriptCore.src = src;

        scriptCore.onreadystatechange = callback;
        scriptCore.onload = callback;

        head = document.getElementsByTagName('head')[0]
        head.appendChild(scriptCore);
    }
});