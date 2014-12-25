import Events from './events';
import Ticker from './ticker';

export class Timer extends Ticker {
    constructor (options) {
        super(options);

        this.validEvents = [
            Timer.TICK,
            Timer.START,
            Timer.STOP,
            Timer.PAUSE,
            Timer.COMPLETE
        ];

        this.timeAtPause = 0;

        this.model.state       = Timer.STOPPED;
        this.model.startTime   = null;
        this.model.currentTime = this.model.currentTime || null;
        this.model.epsilon     = this.model.epsilon || null;
        this.model.playTime    = this.model.playTime || null;
    }

    start () {
        if (this.state !== Timer.TICKING) {
            if (this.playTime > 0 && this.playTime != null) {
                this.state = Timer.TICKING;
                this.createInterval();
                this.events.broadcast(Timer.START);
                this.startTime = Date.now();
                // reset the pause time variables
                this.timeAtPause = 0;
            } else {
                throw new Error('Timer: valid playTime must be set before calling start');
            }
        }
    }

    pause () {
        if (this.state === Timer.TICKING) {
            this.state = Timer.PAUSED;
            this.timeAtPause = this.currentTime;
            this.destroyInterval();
            this.events.broadcast(Timer.PAUSE);
        } else if (this.state === Timer.PAUSED) {
            this.start();
        }
    }

    stop () {
        this.state = Timer.STOPPED;
        this.destroyInterval();
        this.events.broadcast(Timer.STOP);
        this.timeAtPause = 0;
    }

    tick () {
        var data;
        var now = Date.now();
        var currentTime = (now - this.startTime);

        // Stop the Timer and broadcast the COMPLETE event type
        // if currentTime is equal to or greater than playTime.
        if(currentTime >= this.playTime) {
            this.stop();

            data = {
                playTime: this.playTime,
                currentTime: this.playTime,
                epsilon: 1
            };

            this.events.broadcast(Timer.COMPLETE);
            this.events.broadcast(Timer.TICK, data);

        } else {
            this.currentTime = currentTime;
            this.epsilon = (1 / this.playTime) * this.currentTime;

            data = {
                playTime: this.playTime,
                currentTime: this.currentTime,
                epsilon: this.epsilon
            };

            this.events.broadcast(Timer.TICK, data);
        }
    }

    set state(state) {
        this.model.state = state;
    }

    get state() {
        return this.model.state;
    }

    set startTime (milliseconds) {
        this.model.startTime = milliseconds - this.timeAtPause;
    }

    get startTime () {
        return this.model.startTime;
    }

    set playTime (milliseconds) {
        if (milliseconds > 0) {
            this.model.playTime = milliseconds;
        } else {
            throw new Error(`Timer: playTime (${milliseconds}) must be greater than 0`);
        }
    }

    get playTime () {
        return this.model.playTime;
    }

    set currentTime (milliseconds) {
        if (milliseconds >= 0) {
            if (milliseconds <= this.playTime) {
                this.model.currentTime = milliseconds;
            } else {
                throw(new Error(`Timer: currentTime (${milliseconds}) cannot be greater than playTime (${this.playTime})`));
            }
        } else {
            throw(new Error(`Timer: currentTime (${milliseconds}) cannot be less than 0`));
        }
    }

    get currentTime () {
        return this.model.currentTime;
    }

    set epsilon (epsilon) {
        if (epsilon >= 0 && epsilon <= 1) {
            this.model.epsilon = epsilon;
        } else {
            throw new Error(`Timer: epsilon value (${epsilon}) must be between 0 and 1`);
        }
    }

    get epsilon () {
        return this.model.epsilon;
    }
}
// Timer event types
Timer.PAUSE    = 'pause';
Timer.COMPLETE = 'complete';
// Timer states
Timer.PAUSED   = 'paused';

export default Timer;
