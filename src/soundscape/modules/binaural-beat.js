import utils from '../services/utils';
import SoundModule from './sound-module';
// import MultiControlProperty from '../multi-control-property/multi-control-property';

var binauralBeatDefaults = {
    title: 'Binaural Beat Module',
    type: 'binaural-beat-module',
    // Binaural beat module specific settings
    waveType: 'sine',
    pitch: {
        propertyName: 'pitch',
        controlType: 'slider_control',
        value: 440,
        sliderValue: 440,
        followModuleId: null
    },
    beatRate: {
        propertyName: 'beatRate',
        controlType: 'slider_control',
        value: 8,
        sliderValue: 8,
        followModuleId: null
    }
};

class BinauralBeatModule extends SoundModule {
    constructor (config, data) {
        var _self = this;
        // Call the sound SoundModule constructor.
        super(config, data);
        this.model = utils.deepExtend({}, binauralBeatDefaults, this.model);

        // Set up the sound generator
        this.generator = new BinauralBeat(this.audioCtx);
        this.generator.connect(this.gainNode);

        // Set the sound generator specific properties
        this.waveType = this.model.waveType;

        var propertyConfig = {
            moduleId: this.id,
        };

        // Create property controls
        // this.pitch    = new MultiControlProperty(propertyConfig, this.model.pitch);
        // this.beatRate = new MultiControlProperty(propertyConfig, this.model.beatRate);

        // this.events = Object.assign(this.events, {
        //     pitchEvent: this.scpEvents.on('soundmodule', 'pitchChange', _self, _self.onPitchChange),
        //     beatRateEvent: this.scpEvents.on('soundmodule', 'beatRateChange', _self, _self.onBeatRateChange)
        // });

        // Start the generator
        this.generator.start();
    }

    remove () {
        super.remove();
        this.generator.disconnect();
        this.gainNode.disconnect();
    }

    onPitchChange (e, data) {
        console.log(e, 'beatRateChange');
    }

    onBeatRateChange (e, data) {
        console.log(e, 'beatRateChange');
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    get waveType () {
        return this.model.waveType;
    }

    set waveType (type) {
        if(type !== void 0 && type !== null && typeof type === 'string') {
            this.model.waveType = type;
            this.generator.setWaveType(this.model.waveType);
        }
    }

    get pitch () {
        return this.model.pitch;
    }

    set pitch (pitchObj) {
        if(pitchObj !== void 0 && typeof pitchObj === 'object') {
            Object.assign(this.model.pitch, pitchObj);
            this.generator.setPitch(this.model.pitch.value);
        }
    }

    get beatRate () {
        return this.model.beatRate;
    }

    set beatRate (beatRateObj) {
        if(beatRateObj !== void 0 && typeof beatRateObj === 'object') {
            Object.assign(this.model.beatRate, beatRateObj);
            this.generator.setBeatRate(this.model.beatRate.value);
        }
    }
}

export default BinauralBeatModule;
