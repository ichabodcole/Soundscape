import SoundModule from './sound-module';

var colorNoiseDefaults = {
    title: "Noise Module",
    type: 'noise-module',
    noiseType: 'brown'
};

class ColorNoiseModule extends SoundModule {
    constructor (options) {
        super(options);

        this.model = Object.assign({}, colorNoiseDefaults, this.model);

        // Setup the sound generator
        this.generator = new NoiseGen(this.audioCtx);
        this.generator.connect(this.gainNode);

        // Set the sound generator specific properties
        this.generator.setNoiseType(this.model.noiseType);

        // Start the generator
        this.generator.start();
    }

    remove () {
        super.remove();
        this.generator.remove();
        this.generator.disconnect();
        this.gainNode.disconnect();
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    /*** noiseType ***/
    get noiseType () {
        return this.model.noiseType;
    }

    set noiseType (type) {
        if(type !== void 0 && type !== null) {
            this.model.noiseType = type;
            this.generator.setNoiseType(this.model.noiseType);
        }
    }
}

export default ColorNoiseModule;
