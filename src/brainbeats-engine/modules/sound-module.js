import utils from '../utils';

var soundModuleDefaults = {
        muted  : false,
        soloed : false,
        enabled: true,
        volume : {
            ref: 'volume',
            controlType: 'slider_control',
            followModuleId: null,
            sliderValue: 0.5,
            value: 0.5
        }
    };

class SoundModule {
    constructor (options) {
        this.audioCtx   = options.audioCtx;
        this.masterGain = options.masterGain;
        this.gainNode   = this.audioCtx.createGain();
        // Setup default values.

        this.model = Object.assign({}, soundModuleDefaults);

        // If the data attribute is set and is an object
        // initialize this model with it.
        if(options.data && utils.isObject(options.data)) {
            Object.assign(this.model, options.data);
        }

        this.volume = this.model.volume;

        // this.scope.$on('bb:soundscape:solo', function (e, soloCount) {
        //     _self.soloCheck(soloCount);
        // });
    }

    start () {
        this.gainNode.connect(this.masterGain);
    }

    stop () {
        this.gainNode.disconnect();
    }

    disable () {}

    remove () {
        this.solo = false;
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
            // this.scope.$emit('bb:soundmodule:solo');
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
        if(volumeObj !== void 0 && typeof volumeObj === 'object') {
            Object.assign(this.model.volume, volumeObj);
            if (this.enable === true && this.mute === false) {
                this.gain = this.volume.value;
            }
        }
    }
}

export default SoundModule;
