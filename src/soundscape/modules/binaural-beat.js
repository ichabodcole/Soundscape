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
    // Private Methods
    __onPitchChange (e) {
        this.generator.setPitch(e.value);
    }

    __onBeatRateChange (e) {
        this.generator.setBeatRate(e.value);
    }

    constructor (options) {
        this.pitchListener = null;
        this.beatRateListener = null;

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

    // Public API
    start() {
        super.start();
        this.pitchListener = this.__onPitchChange.bind(this)
        this.beatRateListener = this.__onBeatRateChange.bind(this);

        this.pitch.on(OmniControl.VALUE_CHANGE, this.pitchListener);
        this.beatRate.on(OmniControl.VALUE_CHANGE, this.beatRateListener);
        this.generator.start();
    }

    stop() {
        super.stop();
        this.pitch.removeListener(OmniControl.VALUE_CHANGE, this.pitchListener);
        this.beatRate.removeListener(OmniControl.VALUE_CHANGE, this.beatRateListener);
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
