import utils from '../services/utils';
import scpEvents from '../services/soundscape-events';
import PropertyControl from './property-control/property-control';

var soundModuleDefaults = {
        muted  : false,
        soloed : false,
        enabled: true,
        volume : {
            propertyName: 'volume',
            controlType: 'slider_control',
            followModuleId: null,
            sliderValue: 0.5,
            value: 0.5
        }
    };

class SoundModule {
    constructor (config, data) {
        this.audioCtx   = config.audioCtx;
        this.masterGain = config.masterGain;
        this.gainNode   = config.audioCtx.createGain();
        this.scpEvents  = scpEvents;

        // Setup default values.
        this.model = Object.assign({}, soundModuleDefaults);

        // If the data attribute is set and is an object
        // initialize this model with it.
        if(data && utils.isObject(data)) {
            Object.assign(this.model, data);
        }

        // Create a volume property control
        this.volume = new PropertyControl({ moduleId: this.id }, this.model.volume);

        // Events
        this.events = {
            soloEvent: this.scpEvents.on('soundscape', 'solo', this, this.onSoloUpdate),
            volumeEvent: this.scpEvents.on(this.id, 'volumeUpdate', this, this.onVolumeUpdate)
        };
    }

    // Event Handlers
    onVolumeUpdate (e, data) {
        if (this.enable === true && this.mute === false) {
            this.gain = this.volume.value;
        }
    }

    onSoloUpdate (e, data) {
        this.soloCheck(data.soloCount);
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
        // this.eventBus.off();
    }

    soloCheck (soloCount) {
        if(!this.model.soloed && soloCount !== 0) {
            this.enable = false;
        } else {
            this.enable = true;
        }
    }

    followModuleProperty (moduleId, property) {
        var _self = this,
            followModule = followModules.filter(function(followModule) {
                return followModule.id === moduleId;
            })[0];

        // scope.$watch(function() { return followModule[property].value; }, function (propertyValue) {
        //     _self[property].value = property.value;
        // });
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

    /*** title ***/
    get title () {
        return this.model.title;
    }

    set title (title) {
        if (title != null && typeof title === 'string') {
            this.model.title = title;
        }
    }

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

    /*** solo ***/
    get solo () {
        return this.model.soloed;
    }

    set solo (soloBool) {
        if(soloBool !== void 0 && typeof soloBool === 'boolean') {
            this.model.soloed = soloBool;
            console.log('solo');
            this.scpEvents.broadcast('soundmodule', 'solo', { solo: soloBool });
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
                    this.gain = this.volume.value;
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
                    this.gain = this.volume.value;
                }
            } else {
                this.gain = 0;
            }
        }
    }

    /*** volume ***/
    get volume () {
        return this.model.volume;
    }

    set volume (volumeObj) {
        this.model.volume = volumeObj;
    }
}

export default SoundModule;
