import utils from '../services/utils';

import { BaseControl, BaseControlEvent } from './base-control';
import FollowControl from './follow-control';
import GraphControl from './graph-control';

var omniControlDefaults = {
        propertyName: null,
        controlType: 'range_control',
        max: null,
        min: null,
        rangeValue: 0,
        value: 0,
        graph: []
    };

// Event name constants
export var OmniControlEvent = Object.assign({
    CONTROL_TYPE_CHANGE: 'control_type_change'
}, BaseControlEvent);

export class OmniControl extends BaseControl {
    // "Private" methods
    __isValidControlType (controlType) {
        if(this.controlTypes.indexOf(controlType) === -1) {
            return false;
        }
        return true;
    }

    __onValueChange(e) {
        this.value = e.value;
    }

    __setControlProperty(controlRef, propertyName, value) {
        this.controls[controlRef][propertyName] = value;
    }

    __setControlsProperty(propertyName, value) {
        for (var controlRef in this.controls) {
            this.__setControlProperty(controlRef, propertyName, value);
        }
    }

    // Constructor Init Code
    constructor (options={}) {
        this.controlTypes = [
            OmniControl.BASE_CONTROL,
            OmniControl.FOLLOW_CONTROL,
            OmniControl.GRAPH_CONTROL
        ];

        this.controlInstance;
        this.controlListener;
        // Setup the controls container obj
        this.controls = {};
        this.controls[OmniControl.BASE_CONTROL]   = options.baseControl   || new BaseControl(options);
        this.controls[OmniControl.FOLLOW_CONTROL] = options.followControl || new FollowControl(options);
        this.controls[OmniControl.GRAPH_CONTROL]  = options.graphControl  || new GraphControl(options);

        super(options);
        // Default to a range control if no control is specified in the model object
        this.controlType = options.controlType || OmniControl.BASE_CONTROL;
    }

    // Setters and Getters
    set min (min) {
        super.min = min;
        this.__setControlsProperty('min', min);
    }

    get min () {
        return super.min;
    }

    set max (max) {
        super.max = max;
        this.__setControlsProperty('max', max);
    }

    get max () {
        return super.max;
    }

    set controlType (controlType) {
        if(this.__isValidControlType(controlType)) {
            if (this.controlType !== controlType) {
                // Stop listening to the previous control instance
                if(this.controlInstance != null) {
                    this.controlInstance.removeListener(OmniControlEvent.VALUE_CHANGE, this.controlListener);
                }

                this.model.controlType = controlType;
                this.emit(OmniControlEvent.CONTROL_TYPE_CHANGE, controlType);
                this.controlInstance = this.controls[controlType];
                this.controlListener = this.__onValueChange.bind(this);
                this.controlInstance.on(OmniControlEvent.VALUE_CHANGE, this.controlListener);
            }
        } else {
            throw new Error(`OmniControl: controlType (${controlType}), is not a valid controlType`);
        }
    }

    get controlType() {
        return this.model.controlType;
    }
}

// Control name constants
OmniControl.BASE_CONTROL   = 'base_control';
OmniControl.FOLLOW_CONTROL = 'follow_control';
OmniControl.GRAPH_CONTROL  = 'graph_control';

export default OmniControl;
