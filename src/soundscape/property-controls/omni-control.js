import utils from '../services/utils';
import scpEvents from '../services/soundscape-events';

var omniControlDefaults = {
        propertyName: null,
        controlType: 'range_control',
        max: null,
        min: null,
        rangeValue: 0,
        value: 0,
        graph: []
    };


class OmniControl {
    constructor (config={}, data={}) {
        this.checkPropertyNameExists(data);
        this.controlTypes = [
            OmniControl.RANGE_CONTROL,
            OmniControl.FOLLOW_CONTROL,
            OmniControl.GRAPH_CONTROL
        ];
        this.events = config.events;
        this.model  = Object.assign({}, omniControlDefaults, data);
        this.validEvents = [
            OmniControl.VALUE_UPDATE,
            OmniControl.CONTROL_TYPE_UPDATE
        ];
    }

    on (eventName, context, func) {
        if (this.validEvents.indexOf(eventName) !== -1) {
            return this.events.on(eventName, context, func);
        } else {
            throw new Error('OmniControl:on - unexpected event name: ' + eventName);
        }
    }

    off (token, eventName) {
        this.events.off(token, eventName);
    }

    checkPropertyNameExists (data) {
        if (data.propertyName == null) {
            throw new Error('OmniControl must have a propertyName assigned in data object');
        }
    }

    validFollowProperty (followProperty) {
        if (!(followProperty instanceof OmniControl)) {
            throw new Error('followProperty must set to an instance of OmniControl');
            return false;
        } else if (this === followProperty) {
            throw new Error('Cannot set followProperty to own property');
            return false;
        } else if (this.propertyName !== followProperty.propertyName) {
            throw new Error('Cannot set followProperty ' + this.propertyName + ' to ' + followProperty.propertyName);
            return false;
        } else {
            return true;
        }
    }

    handleControlType (controlType) {
        if (controlType === OmniControl.RANGE_CONTROL) {
            this.value = this.rangeValue;
        } else if (controlType === OmniControl.FOLLOW_CONTROL && this.followProperty != null) {
            this.value = this.followProperty.value;
            this.followProperty.on(OmniControl.VALUE_UPDATE, this, function (e, value) {
                this.value = value;
            });
        }
    }

    remove () {
        console.log('remove');
    }

    // Getters & Setters
    get data () {
        return this.model;
    }

    set data (data) {
        Object.assign(this.model, data);
    }

    get propertyName () {
        return this.model.propertyName;
    }

    get controlType () {
        return this.model.controlType;
    }

    set controlType (controlType) {
        if (this.controlTypes.indexOf(controlType) !== -1) {
            this.model.controlType = controlType;
            this.events.broadcast(OmniControl.CONTROL_TYPE_UPDATE, controlType);
            this.handleControlType(controlType);
        } else {
            // throw new Error ('Cannot set controlType to invalid control type: ' + controlType);

            throw new Error (OmniControl.CT_INVALID({controlType: controlType}));
        }
    }

    get rangeValue () {
        return this.model.rangeValue;
    }

    set rangeValue (rangeValue) {
        this.model.rangeValue = rangeValue;
        if (this.controlType === OmniControl.RANGE_CONTROL) {
            this.value = this.rangeValue;
        }
    }

    get followProperty () {
        if (this.model.followProperty instanceof OmniControl) {
            return this.model.followProperty;
        }
    }

    set followProperty (propertyControl) {
        if (this.validFollowProperty(propertyControl)) {
            this.model.followProperty = propertyControl;
        }
    }

    get graph () {
        return this.model.graph;
    }

    set graph (graph) {
        this.model.graph = graph;
    }

    get value () {
        return this.model.value;
    }

    set value (value) {
        this.model.value = value;
        this.events.broadcast(OmniControl.VALUE_UPDATE, this.model.value);
    }
}

// Control name constants
OmniControl.RANGE_CONTROL       = 'range_control';
OmniControl.FOLLOW_CONTROL      = 'follow_control';
OmniControl.GRAPH_CONTROL       = 'graph_control';
// Event name constants
OmniControl.VALUE_UPDATE        = 'value_update';
OmniControl.CONTROL_TYPE_UPDATE = 'control_type_update';
// Error messages
OmniControl.CT_INVALID = function (data={}) {
    return `Cannot set controlType to invalid control type: ${data.controlType}`;
};

export default OmniControl;
