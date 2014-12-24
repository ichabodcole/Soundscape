// Import dependencies
import BaseControl from './base-control';
import Events from '../services/events';

export class FollowControl extends BaseControl {
    constructor (config, model) {
        super('FollowControl', config, model);
        this.targetToken = null;
    }

    validateTarget (controlTarget) {
        if (!(controlTarget instanceof BaseControl)) {
            this.handleError('target property must be set to an instance of BaseControl');
            return false;
        } else if (this === controlTarget) {
            this.handleError('cannot set target to self');
            return false;
        } else if (this.propertyName !== controlTarget.propertyName) {
            this.handleError(`target control must have propertyName:${this.propertyName} not propertyName:${controlTarget.propertyName}`);
            return false;
        } else {
            return true;
        }
    }

    start () {
        if (this.target != null) {
            this.targetToken = this.target.on(FollowControl.VALUE_CHANGE, (e, value)=> {
                this.value = value;
            }, this);
            this.events.broadcast(FollowControl.START);
        }
    }

    stop () {
        if (this.targetToken != null) {
            this.target.off(this.targetToken, FollowControl.VALUE_CHANGE);
            this.targetToken = null;
            this.events.broadcast(FollowControl.STOP);
        }
    }

    get target () {
        return this.model.target;
    }

    set target (targetControl) {
        if (this.validateTarget(targetControl)) {
            this.model.target = targetControl;
        }
    }
}

// Event String Constants
FollowControl.START = 'follow_start';
FollowControl.STOP  = 'follow_stop';

export var FollowControlProvider = {
    get: function (model) {
        var config = {
            events: new Events().setChannel('follow_control')
        };
        return new FollowControl(config, model);
    }
}

export default FollowControl;
