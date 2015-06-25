"use strict";

describe("State", function() {
    var aState, arbitraryKey, value;

    describe("When instantiated", function() {
        beforeEach(function() {
            aState = new CUORE.State();
            arbitraryKey = 'arbitrary';
            jasmine.addMatchers({
                toBeInstanceOf: CUORE.Matchers.toBeInstanceOf
            });
        });

        it("is a State", function() {
            expect(aState).toBeInstanceOf(CUORE.State);
        });

        it("stores a value under a key", function() {
            expect(aState.hasKey(arbitraryKey)).toBeFalsy();
            aState.save(arbitraryKey, 'any_value');
            expect(aState.hasKey(arbitraryKey)).toBeTruthy();
        });

        it("retrieves undefined when no value is stored", function() {
            expect(aState.retrieve(arbitraryKey)).toBeUndefined();
        });

        describe("and a value is stored ", function() {

            beforeEach(function() {
                value = 'any_value';
                aState.save(arbitraryKey, value);
            });

            it("retrieves value with its key", function() {
                expect(aState.retrieve(arbitraryKey)).toEqual(value);
            });

            it("overwrites with new value", function() {
                var aNewValue = 'a_new_value';

                aState.save(arbitraryKey, aNewValue);
                expect(aState.retrieve(arbitraryKey)).toEqual(aNewValue);
            });

            it("removes key when value is undefined", function() {
                aState.save(arbitraryKey, undefined);
                expect(aState.hasKey(arbitraryKey)).toBeFalsy();
            });

            it("removes key when value is null", function() {
                aState.save(arbitraryKey, null);
                expect(aState.hasKey(arbitraryKey)).toBeFalsy();
            });
        });
    });

    describe("When instantiated with a state persister", function() {
        it("still retrieves the value with its key even though the state was cleared", function() {
            aState = new CUORE.State(
                CUORE.LocalStorageStatePersister()
            );
            arbitraryKey = 'arbitrary';
            value = 'any_value';
            aState.save(arbitraryKey, value);
            aState.clear();

            expect(aState.retrieve(arbitraryKey)).toEqual(value);
        });
    });
});