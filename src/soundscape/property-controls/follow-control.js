// Import dependencies
import BaseControl from './base-control';

export class FollowControl extends BaseControl {
    constructor (options={}) {
        super(options);
        this.state = FollowControl.STOPPED;
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

    onTargetChange(e) {
        this.percent = e.percent;
    }

    start () {
        if (this.target != null && this.state === FollowControl.STOPPED) {
            this.target.on(FollowControl.VALUE_CHANGE, this.onTargetChange.bind(this));
            this.state = FollowControl.ACTIVE;
            this.emit(FollowControl.START);
        }
    }

    stop () {
        if (this.state === FollowControl.ACTIVE) {
            this.target.removeListener(FollowControl.VALUE_CHANGE, this.onTargetChange);
            this.state = FollowControl.STOPPED;
            this.emit(FollowControl.STOP);
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
// Control states
FollowControl.ACTIVE  = 'follow:active';
FollowControl.STOPPED = 'follow:stopped';

export default FollowControl;
