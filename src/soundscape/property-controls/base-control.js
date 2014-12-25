import Events from '../services/events';

class BaseControl {
    constructor (options) {
        this.controlName = options.controlName || 'Property Control';
        this.events = options.events || new Events().setChannel('property-control');
        this.model  = Object.assign({}, options.model || {});
        this.validEvents = [ BaseControl.VALUE_CHANGE ];
    }

    handleError (errorMessage) {
        throw new Error(this.controlName + ': ' + errorMessage);
    }

    on (eventName, func, context=null) {
        if (this.validEvents.indexOf(eventName) !== -1) {
            return this.events.on(eventName, func, context);
        } else {
            this.handleError(`attempting to listen to invalid event: ${eventName}`);
        }
    }

    off (token, eventName) {
        this.events.off(token, eventName);
    }

    set propertyName (propertyName) {
        this.model.propertyName = propertyName;
    }

    get propertyName () {
        return this.model.propertyName;
    }

    get value () {
        return this.model.value;
    }

    set value (valueInt) {
        if (typeof valueInt === 'number') {
            this.model.value = valueInt;
            this.events.broadcast(BaseControl.VALUE_CHANGE, valueInt);
        }
    }
}

BaseControl.VALUE_CHANGE = 'value_change';

export default BaseControl;
