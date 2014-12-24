import utils from '../services/utils';
import Events from '../services/events';

var soundModuleDefaults = {
        muted  : false,
        soloed : false,
        enabled: true,
        volume : {
            propertyName: 'volume',
            controlType: 'range_control',
            followModuleId: null,
            rangeValue: 0.5,
            value: 0.5
        }
    };

class SoundModule {
    constructor (config, data) {
        this.audioCtx   = config.audioCtx;
        this.masterGain = config.masterGain;
        this.gainNode   = config.audioCtx.createGain();
        this.pubSub     = config.pubSub;

        // Setup default values.
        this.model = Object.assign({}, soundModuleDefaults);

        // If the data attribute is set and is an object
        // initialize this model with it.
        if(data && utils.isObject(data)) {
            utils.deepExtend(this.model, data);
        }
        // Create a volume property control
        // this.volume = new MultiControlProperty({ moduleId: this.id }, this.model.volume);
        // this.volume.addTransform(pitchTransform)
        // Events
        this.events = {
            soloEvent: this.pubSub.on('soundscape', 'solo', this, this.onSoloUpdate),
            // volumeEvent: this.pubSub.on(this.id, 'volumeUpdate', this, this.onVolumeUpdate)
            // this.pitch.on(VALUE_UPDATE, (value) => {
            //   this.generator.setPitch(pitchTransform(value))
            // }, this);
        };
    }

    // Event Handlers
    onVolumeUpdate (e, data) {
        if (this.enable === true && this.mute === false) {
            this.gain = this.volume;
        }
    }

    onSoloUpdate (e, data) {
        if (data && !isNaN(data.soloCount)) {
            this.soloCheck(data.soloCount);
            return true;
        }
        return false;
    }

    // Public API
    start () {
        this.gainNode.connect(this.masterGain);
    }

    stop () {
        this.gainNode.disconnect();
    }

    disable () {}

    remove () {
        this.solo = false;
        this.pubSub.off(this.events.soloEvent, 'soundscape', 'solo');
    }

    soloCheck (soloCount) {
        if(!this.model.soloed && soloCount !== 0) {
            this.enable = false;
        } else {
            this.enable = true;
        }
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    getPropertyAttribute(property, attribute) {
        if(this.hasOwnProperty(property) && this[property].hasOwnProperty(attribute)) {
            return this[property][attribute];
        }
    }

    setPropertyAttribute(property, attribute, value) {
        if(this.hasOwnProperty(property) && this[property].hasOwnProperty(attribute)) {
            this[property][attribute] = value;
        }
    }

    /*** id ***/
    get id () {
        return this.model.id;
    }

    /*** type ***/
    get type () {
        return this.model.type;
    }

    /*** title ***/
    get title () {
        return this.model.title;
    }

    set title (title) {
        if (title != null && typeof title === 'string') {
            this.model.title = title;
        }
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

    /*** solo ***/
    get solo () {
        return this.model.soloed;
    }

    set solo (soloBool) {
        if(soloBool !== void 0 && typeof soloBool === 'boolean') {
            this.model.soloed = soloBool;
            this.pubSub.broadcast('soundmodule', 'solo', { solo: soloBool });
        }
    }

    /*** mute ***/
    get mute () {
        return this.model.muted;
    }

    set mute (muteBool) {
        if(muteBool !== void 0 && typeof muteBool === 'boolean') {
            this.model.muted = muteBool;
            if(this.enable === true) {
                if(this.model.muted === true) {
                    this.gain = 0;
                } else {
                    this.gain = this.volume;
                }
            }
        }
    }

    /*** enable ***/
    get enable () {
            return this.model.enabled;
    }

    set enable (enableBool) {
        if(enableBool !== void 0 && typeof enableBool === 'boolean') {
            this.model.enabled = enableBool;
            if (enableBool) {
                if(this.mute === false) {
                    this.gain = this.volume;
                }
            } else {
                this.gain = 0;
            }
        }
    }

    /*** volume ***/
    get volume () {
        return this.model.volume.value;
    }

    get volumeControl () {
        return true;
    }
}

export default SoundModule;
