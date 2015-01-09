// Import dependencies
import BaseControl from './base-control';

export class FollowControl extends BaseControl {
    constructor (options={}) {
        super(options);
        this.validEvents.push(FollowControl.START, FollowControl.STOP);
        this.targetToken = null;
    }

    validateTarget (controlTarget) {
        if (!(controlTarget instanceof BaseControl)) {
            this.__handleError('target property must be set to an instance of BaseControl');
            return false;
        } else if (this === controlTarget) {
            this.__handleError('cannot set target to self');
            return false;
        } else {
            return true;
        }
    }

    start () {
        if (this.target != null) {
            this.targetToken = this.target.on(FollowControl.VALUE_CHANGE, (e, data)=> {
                this.percent = data.percent;
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

export default FollowControl;
