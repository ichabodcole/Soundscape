import utils from '../services/utils';
import Events from '../services/events';
import BaseControl from './base-control';
import { RangeControlProvider, RangeControl } from './range-control';
import { FollowControlProvider, FollowControl } from './follow-control';
import { GraphControlProvider, GraphControl } from './graph-control';

var omniControlDefaults = {
        propertyName: null,
        controlType: 'range_control',
        max: null,
        min: null,
        rangeValue: 0,
        value: 0,
        graph: []
    };


class OmniControl extends BaseControl {
    constructor (options) {
        super(options);

        this.controlTypes = [
            OmniControl.RANGE_CONTROL,
            OmniControl.FOLLOW_CONTROL,
            OmniControl.GRAPH_CONTROL
        ];

        this.controlInstance;
        // Setup the controls container obj
        this.controls = {};
        this.controls[OmniControl.RANGE_CONTROL]  = new RangeControl();
        this.controls[OmniControl.FOLLOW_CONTROL] = new FollowControl({});
        this.controls[OmniControl.GRAPH_CONTROL]  = new GraphControl({});

        // Default to a range control if no control is specified in the model object
        this.controlType = this.model.controlType || OmniControl.RANGE_CONTROL;
        // this.model  = Object.assign({}, omniControlDefaults, model);
        // Add OmniControl spefic events to the validEvents Array.
        this.validEvents.push(OmniControl.CONTROL_TYPE_CHANGE);
    }

    __isValidControlType (controlType) {
        if(this.controlTypes.indexOf(controlType) === -1) {
            return false;
        }
        return true;
    }

    set controlType (controlType) {
        if(this.__isValidControlType(controlType)) {
            this.model.controlType = controlType;
            this.controlInstance = this.controls[controlType];
            this.events.broadcast(OmniControl.CONTROL_TYPE_CHANGE, controlType);
        } else {
            throw new Error(`OmniControl: controlType (${controlType}), is not a valid controlType`);
        }
    }

    get controlType() {
        return this.model.controlType;
    }
}

// Control name constants
OmniControl.RANGE_CONTROL       = 'range_control';
OmniControl.FOLLOW_CONTROL      = 'follow_control';
OmniControl.GRAPH_CONTROL       = 'graph_control';
// Event name constants
OmniControl.CONTROL_TYPE_CHANGE = 'control_type_change';

export default OmniControl;
