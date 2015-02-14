import utils from '../services/utils';
import AudioProvider from '../services/audio-provider';
import { OmniControl, OmniControlEvent } from '../property-controls/omni-control';

var EventEmitter = require('events').EventEmitter;

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

export var SoundModuleEvent = {
    START: 'soundmodule:start',
    STOP: 'soundmodule:stop',
    DESTROY: 'soundmodule:destroy',
    CONNECT: 'soundmodule:connect',
    DISCONNECT: 'soundmodule:disconnect'
};

export class SoundModule extends EventEmitter {
    // Private Methods
    __onVolumeChange (e) {
        if (this.mute === false) {
            this.gain = e.value;
        }
    }

    constructor (options={}) {
        this.state = SoundModule.STOPPED;
        this.volumeListener = null;

        this.audioCtx   = options.audioCtx || AudioProvider.getContext();
        this.gainNode   = this.audioCtx.createGain();

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

    // Public API
    start () {
        this.volumeListener = this.__onVolumeChange.bind(this);
        this.volume.on(OmniControlEvent.VALUE_CHANGE, this.volumeListener);
        this.state = SoundModule.ACTIVE;
        this.emit(SoundModuleEvent.START);
    }

    stop () {
        if(this.volumeListener != null) {
            this.volume.removeListener(OmniControl.VALUE_CHANGE, this.volumeListener);
            this.volumeListener = null;
            this.state = SoundModule.STOPPED;
            this.emit(SoundModuleEvent.STOP);
        }
    }

    connect (gainNode) {
        this.gainNode.connect(gainNode);
        this.emit(SoundModuleEvent.CONNECT);
    }

    disconnect () {
        this.gainNode.disconnect();
        this.emit(SoundModuleEvent.DISCONNECT);
    }

    destroy () {
        this.stop();
        this.disconnect();
        this.emit(SoundModuleEvent.DESTROY);
    }

    serialize () {
        var data = {
            type: this.type,
            muted: this.mute,
            volume: {
                min: this.volume.min,
                max: this.volume.max,
                value: this.volume.value,
                controlType: this.volume.controlType
            }
        };
        return data;
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
}

SoundModule.STOPPED = 'soundmodule:stopped';
SoundModule.ACTIVE  = 'soundmodule:active';

SoundModule.defaults = soundModuleDefaults;

export default SoundModule;
