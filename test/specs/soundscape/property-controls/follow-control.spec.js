import BaseControl from '../../../../src/soundscape/property-controls/base-control';
import FollowControl from '../../../../src/soundscape/property-controls/follow-control';

describe ('FollowControl', function () {
    var fc, events, config, model, listener;
    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadband']);
        config = {
            events: events
        };
        model = {
            propertyName: 'myProperty'
            // target: null
        };
        listener = {
            update: function () {

            }
        };
        fc = new FollowControl(config, model);
    });

    describe ('constructor', function () {
        it ('should not throw an error', function () {
            expect(function () {
                new FollowControl(config, model);
            }).not.toThrow();
        });

        it ('should throw an error if the config object does not have an events attribute', function () {
            expect(function () {
                new FollowControl({}, model);
            }).toThrow(new Error('FollowControl: config object must have an events attribute set to an Events instance'));
        });
    });

    describe ('properties', function () {
        describe ('target', function () {
            var control;

            beforeEach(function () {
                control = new BaseControl('base', config, model);
            });

            it ('should return undefined if followProperty has not been set', function () {
                expect(fc.target).not.toBeDefined();
            });

            it ('should return a control object if one has been set', function ( ) {
                fc.target = control;
                expect(fc.target).toBe(control);
            });

            it ('should throw an error if not set to a control object', function () {
                expect(function () {
                    fc.target = 'Hello';
                }).toThrow(new Error('FollowControl: target property must be set to an instance of BaseControl'));
            });

            it ('should not be set to a value that is not an instance of BaseControl', function () {
                // Have to wrap this or it will break the test.
                expect(function () {
                    fc.target = 'Hello';
                }).toThrow();

                expect(fc.target).not.toBeDefined();
            });

            it ('should throw an error if set to its own OmniControl object', function () {
                expect(function () {
                    fc.target = fc;
                }).toThrow(new Error('FollowControl: cannot set target to self'));
            });

            it ('should not be set to a value that is it self', function () {
                // Have to wrap this or it will break the test.
                expect(function () {
                    fc.target = fc;
                }).toThrow();

                expect(fc.target).not.toBeDefined();
            });

            it ('should throw an error if set to a control object with a different propertyName value', function () {
                var otherModel = {
                    propertyName: 'otherProperty'
                };
                var bc = new BaseControl('BaseControl', config, otherModel);
                expect(function () {
                    fc.target = bc;
                }).toThrow(new Error('FollowControl: target control must have propertyName:myProperty not propertyName:otherProperty'));
            });

            it ('should not set the target when set to a control object with a different propertyName property', function ( ){
                var otherModel = {
                    propertyName: 'otherProperty'
                };
                var bc = new BaseControl('BaseControl', config, otherModel);
                expect(function () {
                    fc.target = bc;
                }).toThrow();

                expect(fc.target).toBe(undefined);
            });
        });
    });

    describe ('methods', function () {
        var bc;

        beforeEach(function () {
            var bcEvents = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
            var bcConfig = {
                events: bcEvents
            };
            bc = new BaseControl('BaseControl', bcConfig, model);
        });

        describe ('start', function () {
            it ('should be defined', function () {
                expect(fc.start).toBeDefined();
            });

            it ('should call the on method of the control being followed', function () {
                spyOn(bc, 'on');
                fc.target = bc;
                fc.start();
                expect(fc.target.on).toHaveBeenCalledWith(FollowControl.VALUE_CHANGE, jasmine.any(Function), jasmine.any(Object));
            });
        });

        describe ('stop', function () {
            it ('should be defined', function () {
                expect(fc.stop).toBeDefined();
            });

            it ('should call the off method of the control being followed', function () {
                spyOn(bc, 'off');
                fc.target = bc;
                fc.start();
                fc.stop();
                expect(fc.target.off).toHaveBeenCalled();
            });
        });
    });
});
