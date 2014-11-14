import RangeControl from '../../../../src/soundscape/property-controls/range-control';

describe ('RangeControl', function () {
    var rc, config, events, listener, model;

    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        config = {
            events: events
        };
        listener = {
            update: function () {
                return true;
            }
        };
        model = {
            propertyName: 'myProperty',
            value: 0.5
        };
        rc = new RangeControl(config, model);
    });

    describe ('constructor', function () {
        it ('should not throw and error', function () {
            expect(function () {
                new RangeControl(config, model);
            }).not.toThrow();
        });

        it ('should throw an error if the config object does not have an events attribute', function () {
            expect(function () {
                new RangeControl({});
            }).toThrow(new Error ('RangeControl: config object must have an events attribute set to an Events instance'));
        });
    });

    describe ('properties', function () {
        describe ('value', function () {
            it ('should get the model value', function () {
                expect(rc.value).toBe(0.5);
            });

            it ('should set the model value', function () {
                rc.value = 0.75;
                expect(rc.value).toBe(0.75);
            });

            it ('should call the broadcast method of the events obj', function () {
                rc.value = 0.65;
                expect(events.broadcast).toHaveBeenCalledWith(RangeControl.VALUE_CHANGE, 0.65);
            });

            it ('should only set the model value if the passed value is a number', function () {
                rc.value = "A String";
                expect(rc.value).toBe(0.5);
            });
        });
    });

    describe ('methods', function () {
        describe ('on', function () {
            it ('should call the on method of the events obj', function () {
                rc.on(RangeControl.VALUE_CHANGE, listener.update, listener);
                expect(events.on).toHaveBeenCalledWith(RangeControl.VALUE_CHANGE, listener.update, listener);
            });

            it ('should throw an error if an invalid event type is passed in', function () {
                expect(function ( ) {
                    rc.on('invalidEvent', listener.update, listener);
                }).toThrow(new Error ('RangeControl: attempting to listen to invalid event: invalidEvent'));
            });
        });

        describe ('off', function () {
            it ('should call the off method of the events obj', function () {
                var token = rc.on(RangeControl.VALUE_CHANGE, listener.update, listener);
                rc.off(token, RangeControl.VALUE_CHANGE);
                expect(events.off).toHaveBeenCalledWith(token, RangeControl.VALUE_CHANGE);
            });
        });
    });
});
