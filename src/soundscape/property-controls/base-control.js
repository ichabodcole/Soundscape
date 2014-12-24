class BaseControl {
    constructor (controlName, config, model={}) {
        this.controlName = controlName;
        this.events = this.validateEvents(config);
        this.model  = this.validateModel(model);
        this.validEvents = [BaseControl.VALUE_CHANGE];
    }

    handleError (errorMessage) {
        throw new Error(this.controlName + ': ' + errorMessage);
    }

    validateEvents (config) {
        if (config.events instanceof Object) {
            return config.events;
        } else {
            this.handleError('config object must have an events attribute set to an Events instance');
        }
    }

    validateModel (model) {
        if (model.propertyName && typeof model.propertyName === 'string') {
            return Object.assign({}, model);
        } else {
            this.handleError('model object must have a propertyName attribute defined');
        }
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
