import utils from '../services/utils';
import SoundModule from './sound-module';
import OmniControl from '../property-controls/omni-control';

var colorNoiseDefaults = {
    type: 'color-noise-module',
    noiseType: 'brown'
};

class ColorNoiseModule extends SoundModule {
    constructor (options) {
        super(options);
        // Setup the sound generator
        this.generator = new NoiseGen(this.audioCtx);
        this.generator.connect(this.gainNode);

        // Set the sound generator specific properties
        this.generator.setNoiseType(this.model.noiseType);
    }

    setDefaults() {
        this.model = Object.assign({}, ColorNoiseModule.defaults);
    }

    start() {
        super.start();
        this.generator.start();
    }

    stop() {
        super.stop();
        this.generator.stop();
    }

    destroy() {
        super.destroy();
        this.generator.remove();
    }

    /*************************************
      *      Getters and Setters
    **************************************/
    get noiseType () {
        return this.generator.noiseType;
    }

    set noiseType(type) {
        this.generator.setNoiseType(type);
    }

    get state() {
        var state = super.state;
        state.noiseType = this.noiseType;
        return state;
    }
}

ColorNoiseModule.defaults = Object.assign({}, SoundModule.defaults, colorNoiseDefaults);

ColorNoiseModule.PINK_NOISE  = NoiseGen.PINK_NOISE;
ColorNoiseModule.WHITE_NOISE = NoiseGen.WHITE_NOISE;
ColorNoiseModule.BROWN_NOISE = NoiseGen.BROWN_NOISE;
ColorNoiseModule.SILENCE     = NoiseGen.SILENCE;

export default ColorNoiseModule;
