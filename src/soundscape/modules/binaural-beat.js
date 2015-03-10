import utils from '../services/utils';
import { SoundModule, SoundModuleEvent } from './sound-module';
import { OmniControl, OmniControlEvent } from '../property-controls/omni-control';

var binauralBeatDefaults = {
    type: 'module:binaural-beat',
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

export var BinauralBeatModuleEvent = Object.assign({}, SoundModuleEvent);

export class BinauralBeatModule extends SoundModule {
    // Private Methods
    __onPitchChange (e) {
        this.generator.setPitch(e.value);
    }

    __onBeatRateChange (e) {
        this.generator.setBeatRate(e.value);
    }

    constructor (options) {
        this.__pitchListener    = this.__onPitchChange.bind(this);
        this.__beatRateListener = this.__onBeatRateChange.bind(this);

        super(options);
        this.initGenerator();
    }

    initGenerator() {
        // Setup the sound generator
        this.generator = new BinauralBeat(this.audioCtx);
        this.generator.connect(this.gainNode);

        this.generator.setPitch(this.model.pitch.value);
        this.generator.setBeatRate(this.model.beatRate.value);
        this.generator.setWaveType(this.model.waveType);
    }

    setDefaults() {
        this.model = Object.assign({}, BinauralBeatModule.defaults);
    }

    setControls() {
        super.setControls();
        // Set the sound generator specific properties
        this.pitch = new OmniControl(this.model.pitch);
        this.pitch.on(OmniControlEvent.VALUE_CHANGE, this.__pitchListener);
        this.controls.push(this.pitch);

        this.beatRate = new OmniControl(this.model.beatRate);
        this.beatRate.on(OmniControlEvent.VALUE_CHANGE, this.__beatRateListener);
        this.controls.push(this.beatRate);
    }

    // Public API
    start() {
        super.start();
        this.generator.start();
    }

    stop() {
        super.stop();
        this.generator.stop();
    }

    destroy() {
        this.pitch.removeListener(OmniControlEvent.VALUE_CHANGE, this.__pitchListener);
        this.beatRate.removeListener(OmniControlEvent.VALUE_CHANGE, this.__beatRateListener);
        super.destroy();
    }

    /*************************************
      *      Getters and Setters
    **************************************/

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
