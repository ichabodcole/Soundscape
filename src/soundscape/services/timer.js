import Events from './events';

class Timer {
    constructor (config) {
        this.interval    = config.interval;
        this.events      = config.events;
        this.validEvents = [
            Timer.TICK,
            Timer.START,
            Timer.STOP
        ];
    }

    start () {
        this.tickInterval = setInterval(this.tick, this.interval);
        this.events.broadcast(Timer.START);
    }

    stop () {
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.events.broadcast(Timer.STOP);
    }

    tick () {
        this.events.broadcast(Timer.TICK);
    }

    on (eventName, fn, context=null) {
        if (this.validEvents.indexOf(eventName) !== -1) {
            var token = this.events.on(eventName, fn, context);
            return token;
        } else {
            throw new Error('Timer: Unexpected event: ' + eventName );
        }
    }

    off (token, eventName) {
        this.events.off(token, eventName);
    }
}

Timer.TICK  = 'timer_tick';
Timer.START = 'timer_start';
Timer.STOP  = 'timer_stop';

export var TimerProvider = {
    get: function (config={}) {
        config.events   = config.events || new Events().setChannel('timer');
        config.interval = config.interval || 50;
        return new Timer(config);
    }
};

export default Timer;
