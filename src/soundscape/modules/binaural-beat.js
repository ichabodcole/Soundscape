import utils from '../services/utils';
import SoundModule from './sound-module';
import OmniControl from '../property-controls/omni-control';

var binauralBeatDefaults = {
    type: 'binaural-beat-module',
    pitch: {
        min: 0,
        max: 1200,
        value: 440
    },
    beatRate: {
        min: 0,
        max: 30,
        value: 12
    },
    waveType: BinauralBeat.SINE
};

class BinauralBeatModule extends SoundModule {
    constructor (options) {
        this.pitchEventToken = null;
        this.beatRateEventToken = null;

        super(options);
        // Setup the sound generator
        this.generator = new BinauralBeat(this.audioCtx);
        this.generator.connect(this.gainNode);
    }

    setDefaults() {
        this.model = Object.assign({}, BinauralBeatModule.defaults);
    }

    setControls() {
        super.setControls();
        // Set the sound generator specific properties
        this.pitch = new OmniControl(this.model.pitch);
        this.beatRate = new OmniControl(this.model.beatRate);
    }

    // Event Handlers
    onPitchChange (e, data) {
        this.generator.setPitch(data.value);
    }

    onBeatRateChange (e, data) {
        this.generator.setBeatRate(data.value);
    }

    // Public API
    start() {
        super.start();
        this.pitchEventToken    = this.pitch.on(OmniControl.VALUE_CHANGE, this.onPitchChange.bind(this));
        this.beatRateEventToken = this.beatRate.on(OmniControl.VALUE_CHANGE, this.onBeatRateChange.bind(this));
        this.generator.start();
    }

    stop() {
        super.stop();
        this.pitch.off(this.pitchEventToken);
        this.beatRate.off(this.beatRateEventToken);
        this.generator.stop();
    }

    destroy() {
        super.destroy();
    }

    /*************************************
      *      Getters and Setters
    **************************************/
    /*** state ***/
    get state() {
        var state = super.state;
        state.pitch = {
            min: this.pitch.min,
            max: this.pitch.max,
            value: this.pitch.value
        };
        state.beatRate = {
            min: this.beatRate.min,
            max: this.beatRate.max,
            value: this.beatRate.value
        };
        return state;
    }

    /*** waveType ***/
    get waveType() {
        return this.generator.waveType;
    }

    set waveType(waveType) {
        this.generator.setWaveType(waveType);
    }
}

BinauralBeatModule.defaults = Object.assign({}, SoundModule.defaults, binauralBeatDefaults);

BinauralBeatModule.SINE     = BinauralBeat.SINE     = 'sine';
BinauralBeatModule.SQUARE   = BinauralBeat.SQUARE   = 'square';
BinauralBeatModule.SAWTOOTH = BinauralBeat.SAWTOOTH = 'sawtooth';
BinauralBeatModule.TRIANGLE = BinauralBeat.TRIANGLE = 'triangle';

export default BinauralBeatModule;
