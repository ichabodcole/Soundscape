import Events from './events';

export class Ticker {
    constructor (options) {
        // Allow option to override events object if desired.
        this.events      = options.events || new Events().setChannel('ticker');
        this.model       = Object.assign({}, options.model) || {};
        this.validEvents = [
            Ticker.TICK,
            Ticker.START,
            Ticker.STOP
        ];
        // Initialize Model
        this.tickInterval = null;
        this.interval = options.interval || 50;
        this.state = Ticker.STOPPED;
    }

    start () {
        this.state = Ticker.TICKING;
        this.createInterval();
        this.events.broadcast(Ticker.START);
    }

    stop () {
        this.state = Ticker.STOPPED;
        this.destroyInterval();
        this.events.broadcast(Ticker.STOP);
    }

    tick () {
        this.events.broadcast(Ticker.TICK);
    }

    createInterval () {
        this.destroyInterval();
        this.tickInterval = setInterval(this.tick.bind(this), this.interval);
    }

    destroyInterval() {
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
            this.tickInterval = null;
        }
    }

    on (eventName, fn, context=null) {
        if (this.validEvents.indexOf(eventName) !== -1) {
            var token = this.events.on(eventName, fn, context);
            return token;
        } else {
            throw new Error('Unknown event type: ' + eventName );
        }
    }

    off (token, eventName) {
        this.events.off(token, eventName);
    }

    set interval(milliseconds) {
        this.model.interval = milliseconds;
        if(this.state === Ticker.TICKING) {
            this.createInterval();
        }
    }

    get interval() {
        return this.model.interval;
    }

    set state(state) {
        this.model.state = state;
    }

    get state() {
        return this.model.state;
    }
}
// Ticker event types
Ticker.TICK  = 'tick';
Ticker.START = 'start';
Ticker.STOP  = 'stop';
// Ticker states
Ticker.STOPPED = 'stopped';
Ticker.TICKING = 'ticking';

export default Ticker;
