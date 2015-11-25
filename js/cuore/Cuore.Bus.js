"use strict";

CUORE.Bus = (function(undefined) {
    var subscriptions = [],
        debugModeON = false;

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        hasSubscriptions: hasSubscriptions,
        subscribers: subscribers,
        emit: emit,
        enableDebug: enableDebug,
        disableDebug: disableDebug
    };

    function subscribe (subscriber, eventName) {
        if (!_validSubscriber(subscriber)) {
            throw new Error("Not a subscriber (lacks eventDispatch function)");
        }

        if (!_subscriptionExists(subscriber, eventName)) {
            subscriptions.push(_createSubscription(subscriber, eventName));
        }
    }

    function unsubscribe(subscriber, events) {
        if (typeof events == "string") {
            _removeSubscription(_createSubscription(subscriber, events));
            return;
        }

        events.forEach(function (event) {
             _removeSubscription(_createSubscription(subscriber, event));
        });
    }

    function hasSubscriptions() {
        return (subscriptions.length > 0);
    }

    function subscribers(theEvent) {
        var selectedSubscribers = [];

        subscriptions.forEach(function (subscription) {
            if (subscription.eventName === theEvent) {
                selectedSubscribers.push(subscription.subscriber);
            }
        });

        return selectedSubscribers;
    }

    function emit(eventName, params) {
        var subscribersList = this.subscribers(eventName);

        debug("Bus.emit (event, params)");
        debug(eventName);
        debug(params);
        debug("------------");

        subscribersList.forEach(function (current) {
             current.eventDispatch(eventName, params);
        });
    }

    function debug(object) {
        if (debugModeON) {
            console.log(object);
        }
    }

    function enableDebug() {
        debugModeON = true;
    }

    function disableDebug() {
        debugModeON = false;
    }

    function _subscriptionExists(subscriber, eventName) {
        var i, len = subscriptions.length,
            theSubscription = _createSubscription(subscriber, eventName);

        for (i = 0; i < len; i++) {
            if (theSubscription.equals(subscriptions[i])) {
                return true;
            }
        }
        return false;
    }

    function _removeSubscription(theSubscription) {
        var i, len = subscriptions.length;

        for (i = 0; i < len; i++) {
            if (theSubscription.equals(subscriptions[i])) {
                this._removeAt(subscriptions, i);
                return;
            }
        }
    }

    function _removeAt (index, array) {
        array.splice(index, 1);
    }

    function _validSubscriber(subscriber) {
        return subscriber.eventDispatch;
    }

    function _createSubscription(subscriber, eventName) {
        return {
            subscriber: subscriber,
            eventName: eventName,
            equals: function(otherSubscription) {
                var sameSubscriber = (this.subscriber === otherSubscription.subscriber),
                    sameEvent = (this.eventName === otherSubscription.eventName);

                return (sameSubscriber && sameEvent);
            }
        };
    }
})();