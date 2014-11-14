import OmniControl from '../../../../src/soundscape/property-controls/omni-control';

describe ('OmniControl', function () {
    var pc, config, data, events;

    it ('should be defined', function () {
        expect(OmniControl).toBeDefined();
    });

    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        config = {
            events: events
        };
        data = {
            propertyName: 'volume',
            rangeValue: 0.5,
            value: 0.5
        };

        pc = new OmniControl(config, data);
    });

    describe('contructor', function () {
        it ('should not throw an error', function () {
            expect(function () {
                new OmniControl();
            }).not.toThrow(config, data);
        });

        it ('should throw an error if no propertyName is provided in the data object', function ( ){
            expect(function ( ){
                new OmniControl(config)
            }).toThrow();
        });
    });

    describe ('setting control types', function ( ) {
        describe ('setting a range control', function ( ){
            it ('should get the property value from the rangeValue property', function ( ) {
                pc.controlType = 'range_control';
                pc.rangeValue = 0.75;
                expect(pc.value).toBe(0.75);
            });
        });
    });

    describe ('properties', function () {
        describe ('data', function () {
            it ('should return the data object', function () {
                expect(pc.data).toBe(pc.model);
            });
        });

        describe ('value', function ( ){
            it ('should be defined', function () {
                expect(pc.value).toBeDefined();
            });

            it ('should return the value property', function () {
                expect(pc.value).toBe(0.5);
            });

            it ('should set the value property', function () {
                pc.value = 0.9;
                expect(pc.value).toBe(0.9);
            });

            it ('should call the broadcast method of the events objs', function () {
                pc.value = 0.11;
                expect(events.broadcast).toHaveBeenCalledWith(OmniControl.VALUE_UPDATE, 0.11);
            });
        });

        describe ('propertyName', function () {
            it ('should be defined', function () {
                expect(pc.propertyName).toBeDefined();
            });
        });

        describe ('controlType', function ( ){
            it ('should be defined', function () {
                expect(pc.controlType).toBeDefined();
            });

            it ('should return the control type', function () {
                expect(pc.controlType).toBe('range_control');
            });

            it ('should set the control type', function () {
                pc.controlType = OmniControl.GRAPH_CONTROL;
                expect(pc.controlType).toBe(OmniControl.GRAPH_CONTROL);
            });

            it ('should call the broadcast method of the events obj', function () {
                pc.controlType = OmniControl.RANGE_CONTROL;
                expect(events.broadcast).toHaveBeenCalledWith(OmniControl.CONTROL_TYPE_UPDATE, OmniControl.RANGE_CONTROL);
            });

            it ('should only set the control type of a valid control type is passed', function () {
                pc.controlType = 'graph_control';
                // Have to wrap this or it will break the test.
                expect(function () {
                    pc.controlType = 'butt_control';
                }).toThrow();

                expect(pc.controlType).toBe('graph_control');
            });

            it ('should throw an error if an invalid control type is passed', function () {
                expect(function () {
                    pc.controlType = 'butt_control';
                }).toThrow(new Error('Cannot set controlType to invalid control type: butt_control'));
            });

            describe ('setting controlType to RANGE_CONTROL', function () {
                it ('should set the value to the current rangeValue', function ( ){
                    pc.controlType = OmniControl.GRAPH_CONTROL;
                    pc.value = 0.11;
                    pc.rangeValue = 0.15;
                    pc.controlType = OmniControl.RANGE_CONTROL;
                    expect(pc.value).toEqual(pc.rangeValue);
                });
            });

            describe ('setting controlType to FOLLOW_CONTROL', function () {
                it ('should set the value property to the followPropertys value if a followProperty has been set', function () {
                    var pc2 = new OmniControl(config, data);
                    pc2.value = 0.25;

                    pc.value = 0.15;
                    pc.followProperty = pc2;
                    pc.controlType = OmniControl.FOLLOW_CONTROL;

                    expect(pc.value).toBe(pc2.value);
                });

                it ('should not set the value property if a followProperty has not been set', function () {
                    pc.value = 0.15;
                    pc.controlType = OmniControl.FOLLOW_CONTROL;

                    expect(pc.value).toBe(pc.value);
                });
            });
        });

        describe ('rangeValue', function () {

            it ('should be defined', function () {
                expect(pc.rangeValue).toBeDefined();
            });

            it ('should return the rangeValue', function () {
                expect(pc.rangeValue).toBe(0.5);
            });

            it ('should set the rangeValue', function () {
                pc.rangeValue = 1;
                expect(pc.rangeValue).toBe(1);
            });

            it ('should set the value property to the rangeValue if the controlType is RANGE_CONTROL', function ( ) {
                pc.controlType = OmniControl.RANGE_CONTROL;
                pc.rangeValue = 0.25;
                expect(pc.value).toEqual(0.25);
            });

            it ('should not set the value property to the rangeValue if the controlType is not RANGE_CONTROL', function () {
                pc.controlType = OmniControl.GRAPH_CONTROL;
                pc.rangeValue = 0.25;
                expect(pc.value).toEqual(0.5);
            });
        });

        describe ('followProperty', function () {
            it ('should return undefined if followProperty has not been set', function () {
                expect(pc.followProperty).toBe(undefined);
            });

            it ('should return a OmniControl object if one has been set', function ( ) {
                var pc2 = new OmniControl(config, data);
                pc.followProperty = pc2;
                expect(pc.followProperty).toBe(pc2);
            });

            it ('should set followProperty to a OmniControl object', function () {
                var pc2 = new OmniControl(config, data);
                pc.followProperty = pc2;
                expect(pc.followProperty).toEqual(pc2);
            });

            it ('should throw an error if followProperty is not a OmniControl object', function () {
                expect(function () {
                    pc.followProperty = 'Hello';
                }).toThrow(new Error('followProperty must set to an instance of OmniControl'));
            });

            it ('should not set followProperty if the argument is not a OmniControl', function () {
                // Have to wrap this or it will break the test.
                expect(function () {
                    pc.followProperty = 'Hello';
                }).toThrow();

                expect(pc.followProperty).toBe(undefined);
            });

            it ('should throw an error if followProperty is set to its own OmniControl object', function () {
                expect(function () {
                    pc.followProperty = pc;
                }).toThrow(new Error('Cannot set followProperty to own property'));
            });

            it ('should not set the followProperty when set to its own OmniControl object', function () {
                // Have to wrap this or it will break the test.
                expect(function () {
                    pc.followProperty = pc;
                }).toThrow(new Error('Cannot set followProperty to own property'));
                expect(pc.followProperty).toBe(undefined);
            });

            it ('should throw an error if followProperty is set to a OmniControl with a different propertyName property', function () {
                data.propertyName = 'someProperty';
                var pc2 = new OmniControl(config, data);
                expect(function () {
                    pc.followProperty = pc2;
                }).toThrow(new Error('Cannot set followProperty volume to someProperty'));
            });

            it ('should not set the followProperty when set to a OmniControl with a different propertyName property', function ( ){
                data.propertyName = 'someProperty';
                var pc2 = new OmniControl(config, data);
                // Have to wrap this or it will break the test.
                expect(function () {
                    pc.followProperty = pc2;
                }).toThrow();
                //
                expect(pc.followProperty).toBe(undefined);
            });
        });

        describe ('following a module', function () {
            it ('should call the on method of the followProperty', function ( ){
                var pc2 = new OmniControl(config, data);
                spyOn(pc2, 'on');
                pc.followProperty = pc2;
                pc.controlType = OmniControl.FOLLOW_CONTROL;

                expect(pc2.on).toHaveBeenCalledWith(OmniControl.VALUE_UPDATE, jasmine.any(Object), jasmine.any(Function));
            });
        });

        describe ('graph', function () {
            it ('should be defined', function () {
                expect(pc.graph).toBeDefined();
            });
        });
    });

    describe ('methods', function () {
        var onValueUpdate, onControlUpdate;

        beforeEach(function () {
            onValueUpdate = function (e, data) {
                return true;
            };

            onControlUpdate = function (e, data) {
                return true;
            };
        });

        describe ('on', function () {
            it ('should be defined', function () {
                expect(pc.on).toBeDefined();
            });

            it ('should call the on method of the events obj', function () {
                pc.on(OmniControl.VALUE_UPDATE, this, onValueUpdate);
                expect(events.on).toHaveBeenCalledWith(OmniControl.VALUE_UPDATE, jasmine.any(Object), jasmine.any(Function));
            });

            it ('should throw an error if attempting to listen to an invalid event type', function () {
                expect(function () {
                    pc.on('chunkyBacon', this, onValueUpdate);
                }).toThrow(new Error('OmniControl:on - unexpected event name: chunkyBacon'));
            });
        });

        describe ('off', function () {
            it ('should be defined', function () {
                expect(pc.off).toBeDefined();
            });

            it ('should call the off method of the events obj', function () {
                var token = pc.on(OmniControl.VALUE_UPDATE, this, onValueUpdate);
                pc.off(token, OmniControl.VALUE_UPDATE);
                expect(events.off).toHaveBeenCalledWith(token, OmniControl.VALUE_UPDATE);
            });
        });
    });
});
