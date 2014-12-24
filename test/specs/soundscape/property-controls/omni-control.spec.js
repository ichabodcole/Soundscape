import OmniControl from '../../../../src/soundscape/property-controls/omni-control';
import RangeControl from '../../../../src/soundscape/property-controls/range-control';
import FollowControl from '../../../../src/soundscape/property-controls/follow-control';
import GraphControl from '../../../../src/soundscape/property-controls/graph-control';

describe ('OmniControl', function () {
    var omniCtrl, config, data, events;

    it ('should be defined', function () {
        expect(OmniControl).toBeDefined();
    });

    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        events.on.and.returnValue('someToken');
        config = {
            events: events
        };
        data = {
            propertyName: 'volume',
            rangeValue: 0.5,
            value: 0.5
        };

        omniCtrl = new OmniControl(config, data);
    });

    describe('properties', function() {

        describe('controlInstance', function() {
            it('should be set to the current controls instance', function() {
                expect(omniCtrl.controlInstance instanceof RangeControl).toBe(true);
            });
        });

        describe('controlType', function() {

            it ('should default to the RANGE_CONTROL type', function(){
                expect(omniCtrl.controlType).toBe(OmniControl.RANGE_CONTROL);
            });

            it('should use the provide models controlType property if present', function() {
                data.controlType = OmniControl.FOLLOW_CONTROL;
                omniCtrl = new OmniControl(config, data);
                expect(omniCtrl.controlType).toBe(OmniControl.FOLLOW_CONTROL);
            });

            describe('as a setter', function() {
                it('should set the models controlType property', function(){
                    omniCtrl.controlType = OmniControl.RANGE_CONTROL;
                    expect(omniCtrl.model.controlType).toBe(OmniControl.RANGE_CONTROL);
                });

                it('should set controlInstance the control instance associated with the controlType', function() {
                    omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                    expect(omniCtrl.controlInstance instanceof FollowControl).toBe(true);
                });

                it('should only accept valid controlTypes', function() {
                    expect(function(){
                        omniCtrl.controlType = 'chunkyBacon';
                    }).toThrow(new Error('OmniControl: controlType (chunkyBacon), is not a valid controlType'));
                });

                it('should broadcast the CONTROL_TYPE_CHANGE event', function() {
                    omniCtrl.controlType = OmniControl.FOLLOW_CONTROL;
                    expect(events.broadcast).toHaveBeenCalledWith(OmniControl.CONTROL_TYPE_CHANGE, OmniControl.FOLLOW_CONTROL);
                });
            });


            describe ('as a getter', function() {
                it('should return the models controlType property', function(){
                    omniCtrl.model.controlType = OmniControl.RANGE_CONTROL;
                    expect(omniCtrl.controlType).toBe(OmniControl.RANGE_CONTROL);
                });
            });
        });

    });

    describe('methods', function() {

    });
});
