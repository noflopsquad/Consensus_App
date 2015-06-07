"use strict";

CUORE.Matchers = {
    toBeInstanceOf: function() {
        return {
            compare: function(actual, expectedType) {
                var result = {};
                result.pass = actual instanceof expectedType;
                if (!result.pass) {
                    result.message = actual + " isn't an instance of expected type";
                }
                return result;
            }
        };
    },

    toBeFunction: function() {
        var actual = this.actual;
        this.message = function() {
            return actual + " isn't a function";
        }
        return typeof actual === 'function';
    },

    toContainAnElement: function(HTMLElementType) {
        var figures = this.actual.getElementsByTagName(HTMLElementType);
        return (figures.length > 0);
    },

    toContainClass: function(classname) {
        return CUORE.Dom.hasClass(this.actual, classname);
    },

    toHaveBeenCalledWithAHandlerForEvent: function(expectedEventName) {
        var spy = this.actual;
        var mostRecentCall = spy.mostRecentCall;
        var supposedToBeAHandler = mostRecentCall.args[1];
        return mostRecentCall.args[0] == expectedEventName && supposedToBeAHandler && typeof supposedToBeAHandler == 'object' && typeof supposedToBeAHandler.handle == 'function';
    },

    toHaveBeenCalledOnceWithTheComponent: function(comp) {
        var spy = this.actual;
        this.message = function() {
            return "Expected the spy " + jasmine.pp(spy) + " to have been called with the component " + comp.getName();
        }
        return spy.callCount == 1 && spy.mostRecentCall.args[0] == comp;
    }
};