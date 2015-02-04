import utils from '../services/utils';
import Events from '../services/events';
import AudioProvider from '../services/audio-provider';
import OmniControl from '../property-controls/omni-control';

var soundModuleDefaults = {
    type: 'sound-module',
    muted  : false,
    volume : {
        min:0,
        max:1,
        value: 1,
        controlType: OmniControl.BASE_CONTROL
    }
};

class SoundModule {
    constructor (options={}) {
        this.volumeEventToken = null;

        this.audioCtx   = options.audioCtx || AudioProvider.getContext();
        this.gainNode   = this.audioCtx.createGain();
        this.events     = options.events || new Events().setChannel('soundModule');

        this.setDefaults();
        this.setOptions(options);
        this.setControls();
    }

    setDefaults () {
        // Setup default values.
        this.model = Object.assign({}, SoundModule.defaults);
    }

    setOptions (options) {
        // If the options.model attribute is set and is an object
        // initialize this model with it.
        if(options && utils.isObject(options)) {
            utils.deepExtend(this.model, options);
        }
    }

    setControls () {
        // Create a volume property control
        this.volume = new OmniControl(this.model.volume);
    }

    // Event Handlers
    onVolumeChange (e, data) {
        if (this.mute === false) {
            this.gain = data.value;
        }
    }

    // Public API
    start () {
        this.volumeEventToken = this.volume.on(OmniControl.VALUE_CHANGE, this.onVolumeChange.bind(this));
    }

    stop () {
        this.volume.off(this.volumeEventToken);
    }

    connect (gainNode) {
        this.gainNode.connect(gainNode);
    }

    disconnect () {
        this.gainNode.disconnect();
    }

    destroy () {
        this.stop();
        this.disconnect();
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    /*** type ***/
    get type () {
        return this.model.type;
    }

    /*** gain ***/
    get gain () {
        return this.gainNode.gain.value;
    }

    set gain (gainInt) {
        if(gainInt !== void 0 && typeof gainInt === 'number') {
            this.gainNode.gain.value = gainInt;
        }
    }

    /*** mute ***/
    get mute () {
        return this.model.muted;
    }

    set mute (muteBool) {
        this.gain = (muteBool) ? 0 : this.volume.value;
        this.model.muted = muteBool;
    }

    /*** state ***/
    get state () {
        var state = {
            type: this.type,
            muted: this.mute,
            volume: {
                min: this.volume.min,
                max: this.volume.max,
                value: this.volume.value,
                controlType: this.volume.controlType
            }
        };
        return state;
    }
}

SoundModule.defaults = soundModuleDefaults;

export default SoundModule;
