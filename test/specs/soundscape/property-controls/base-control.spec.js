import BaseControl from '../../../../src/soundscape/property-controls/base-control';

describe ('BaseControl', function () {
    var bc, config, events, listener, model;

    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        config = {
            events: events
        };
        listener  = {
            update: function () {
                return true;
            }
        };
        model = {
            propertyName: 'baseProperty',
            value: 0.5
        };
        bc = new BaseControl('BaseControl', config, model);
    });

    describe ('constructor', function () {

        it ('should not throw and error', function () {
            expect(function () {
                new BaseControl('BaseControl', config, model);
            }).not.toThrow();
        });

        it ('should throw an error if no propertyName is defined in the model', function () {
            expect(function () {
                new BaseControl('BaseControl', config, {});
            }).toThrow(new Error ('BaseControl: model object must have a propertyName attribute defined'));
        });

        it ('should throw an error if the config object does not have an events attribute', function () {
            expect(function () {
                new BaseControl('BaseControl', {}, model);
            }).toThrow(new Error ('BaseControl: config object must have an events attribute set to an Events instance'));
        });
    });

    describe ('properties', function () {

        describe ('propertName', function () {
            it ('should be defined', function () {
                expect(bc.propertyName).toBeDefined();
            });

            it ('should get the models propertyName value', function () {
                expect(bc.propertyName).toBe('baseProperty');
            });
        });

        describe ('value', function () {
            it ('should get the model value', function () {
                expect(bc.value).toBe(0.5);
            });

            it ('should set the model value', function () {
                bc.value = 0.75;
                expect(bc.value).toBe(0.75);
            });

            it ('should call the broadcast method of the events obj', function () {
                bc.value = 0.65;
                expect(events.broadcast).toHaveBeenCalledWith(BaseControl.VALUE_CHANGE, 0.65);
            });

            it ('should only set the model value if the passed value is a number', function () {
                bc.value = "A String";
                expect(bc.value).toBe(0.5);
            });
        });

        xdescribe ('rawValue', function () {

        });

        xdescribe ('transforms', function () {

        });
    });

    describe ('methods', function () {

        describe ('on', function () {
            beforeEach(function () {
                events.on.and.returnValue('myTokenId01');
            });

            it ('should call the on method of the events obj', function () {
                bc.on(BaseControl.VALUE_CHANGE, listener.update, listener);
                expect(events.on).toHaveBeenCalledWith(BaseControl.VALUE_CHANGE, listener.update, listener);
            });

            it ('should throw an error if an invalid event type is passed in', function () {
                expect(function ( ) {
                    bc.on('invalidEvent', listener.update, listener);
                }).toThrow(new Error ('BaseControl: attempting to listen to invalid event: invalidEvent'));
            });

            it ('should return a token string', function () {
                var token = bc.on(BaseControl.VALUE_CHANGE, listener.update, listener);
                expect(typeof token).toEqual('string');
            });
        });

        describe ('off', function () {
            it ('should call the off method of the events obj', function () {
                var token = bc.on(BaseControl.VALUE_CHANGE, listener.update, listener);
                bc.off(token, BaseControl.VALUE_CHANGE);
                expect(events.off).toHaveBeenCalledWith(token, BaseControl.VALUE_CHANGE);
            });
        });

        xdescribe ('addTransform', function () {

        });

        xdescribe ('removeTransform', function () {

        });
    });
});
