import utils from '../services/utils';
import { SoundModule, SoundModuleEvent } from './sound-module';
import OmniControl from '../property-controls/omni-control';

var colorNoiseDefaults = {
    type: 'module:color-noise',
    noiseType: 'brown'
};

export var ColorNoiseModuleEvent = Object.assign({}, SoundModuleEvent);

export class ColorNoiseModule extends SoundModule {
    constructor (options) {
        super(options);
        this.initGenerator();
    }

    initGenerator() {
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
}

ColorNoiseModule.defaults = Object.assign({}, SoundModule.defaults, colorNoiseDefaults);

ColorNoiseModule.PINK_NOISE  = NoiseGen.PINK_NOISE;
ColorNoiseModule.WHITE_NOISE = NoiseGen.WHITE_NOISE;
ColorNoiseModule.BROWN_NOISE = NoiseGen.BROWN_NOISE;
ColorNoiseModule.SILENCE     = NoiseGen.SILENCE;

export default ColorNoiseModule;
