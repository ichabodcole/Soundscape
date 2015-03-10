import { OmniControl, OmniControlEvent } from '../../../../src/soundscape/property-controls/omni-control';
//import RangeControl from '../../../../src/soundscape/property-controls/base-control';
//import FollowControl from '../../../../src/soundscape/property-controls/follow-control';
//import GraphControl from '../../../../src/soundscape/property-controls/graph-control';

xdescribe ('OmniControl', function () {
    var omniCtrl, options;

    xit ('should be defined', function () {
        expect(OmniControl).toBeDefined();
    });

    beforeEach(function () {
        //var baseControl = jasmine.createSpyObj('baseControl', ['on', 'off'])
        options = {
            controlName: 'OmniControl',
            propertyName: 'volume',
            min: 0,
            max: 10,
            value: 1
        };

        omniCtrl = new OmniControl(options);
    });

    xdescribe('contructor', function() {
        it('should not throw', function() {
            var options = {
                min: 100,
                max: 400
            };
            expect(function() {
                new OmniControl(options);
            }).not.toThrow();
        });
    });

    xdescribe('properties', function() {

        describe('max', function() {
            it('should set the models max property and the max properties of all sub controls', function() {
                omniCtrl.max = 12;
                expect(omniCtrl.model.max).toBe(12);
            });

            it('should set the max property for all sub controls', function(){
                omniCtrl.max = 12;
                expect(omniCtrl.control.max).toBe(omniCtrl.max);
            });
        });

        describe('min', function() {
            it('should set the models min property and the min properties of all sub controls', function() {
                omniCtrl.min = 5;
                expect(omniCtrl.model.min).toBe(5);
            });

            it('should set teh min property for all sub controls', function() {
                omniCtrl.min = 5;
                expect(omniCtrl.control.min).toBe(omniCtrl.min);
            });
        });

        describe('controlType', function() {

            it ('should default to the BASE_CONTROL type', function(){
                expect(omniCtrl.controlType).toBe(OmniControl.BASE_CONTROL);
            });

            it('should use the provide models controlType property if present', function() {
                options.controlType = OmniControl.FOLLOW_CONTROL;
                omniCtrl = new OmniControl(options);
                expect(omniCtrl.controlType).toBe(OmniControl.FOLLOW_CONTROL);
            });

            describe('as a setter', function() {
                it('should set the models controlType property', function(){
                    omniCtrl.controlType = OmniControl.BASE_CONTROL;
                    expect(omniCtrl.model.controlType).toBe(OmniControl.BASE_CONTROL);
                });

                it('should only accept valid controlTypes', function() {
                    expect(function(){
                        omniCtrl.controlType = 'chunkyBacon';
                    }).toThrow(new Error('OmniControl: controlType (chunkyBacon), is not a valid controlType'));
                });

                it('should emit the CONTROL_TYPE_CHANGE event', function() {
                    spyOn(omniCtrl, 'emit');
                    omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                    expect(omniCtrl.emit).toHaveBeenCalledWith(OmniControlEvent.CONTROL_TYPE_CHANGE, OmniControl.FOLLOW_CONTROL);
                });

                it('should not broadcast the CONTROL_TYPE_CHANGE if set to the same type of control', function() {
                    spyOn(omniCtrl, 'emit');
                    omniCtrl.controlType = OmniControl.BASE_CONTROL;
                    expect(omniCtrl.emit.calls.count()).toBe(0);
                });

                describe('setting a base control', function() {
                    it('should start listening to value changes from the base control', function() {
                        omniCtrl.controlType = OmniControl.BASE_CONTROL;
                        omniCtrl.control.value = 4;
                        expect(omniCtrl.value).toBe(4);
                        expect(omniCtrl.percent).toBe(0.4);
                    });

                    it('should stop listening value changes from other control instances', function() {
                        omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                        var followControl = omniCtrl.control;

                        omniCtrl.controlType = OmniControl.BASE_CONTROL;
                        var baseControl = omniCtrl.control;
                        baseControl.value = 6;

                        followControl.value = 0.6;

                        expect(omniCtrl.value).toBe(6);
                        expect(omniCtrl.percent).toBe(0.6);
                    });
                });

                describe('setting a follow control', function() {
                    it('should start listening to value changes from the follow control', function() {
                        omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                        omniCtrl.control.value = 0.85;
                        expect(omniCtrl.value).toBe(0.85);
                    });

                    it('should stop listening value changes from other control instances', function() {
                        omniCtrl.controlType = OmniControl.BASE_CONTROL;
                        var baseControl = omniCtrl.control;

                        omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                        var followControl = omniCtrl.control;
                        followControl.value = 0.85;

                        baseControl.value = 0.25;

                        expect(omniCtrl.value).toBe(0.85);
                    });
                });

                xdescribe('setting a graph control', function() {
                    it('should start listening to value changes from the follow control', function() {
                        omniCtrl.controlType = OmniControl.GRAPH_CONTROL;
                        omniCtrl.control.value = 0.85;
                        expect(omniCtrl.value).toBe(0.85);
                    });

                    it('should stop listening value changes from other control instances', function() {
                        omniCtrl.controlType = OmniControl.BASE_CONTROL;
                        var baseControl = omniCtrl.control;

                        omniCtrl.controlType = OmniControl.GRAPH_CONTROL;
                        var graphControl = omniCtrl.control;
                        graphControl.value = 0.85;

                        baseControl.value = 0.25;

                        expect(omniCtrl.value).toBe(0.85);
                    });
                });
            });

            describe ('as a getter', function() {
                it('should return the models controlType property', function(){
                    omniCtrl.model.controlType = OmniControl.BASE_CONTROL;
                    expect(omniCtrl.controlType).toBe(OmniControl.BASE_CONTROL);
                });
            });
        });

        describe('control', function() {
            beforeEach(function() {
                options.baseControl = jasmine.createSpyObj('baseControl', ['on', 'removeListener', 'emit']);
                options.followControl = jasmine.createSpyObj('followControl', ['on', 'removeListener', 'emit']);
                omniCtrl = new OmniControl(options);
            });

            it('should return an instance of a control associated with the current controlType', function() {
                omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                expect(omniCtrl.control).toBe(options.followControl);
            });
        });
    });
});
