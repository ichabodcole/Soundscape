import utils from './services/utils';
import SoundModuleFactory from './modules/module-factory';
import AudioContextProvider from './services/audio-context-provider';
import Events from './services/events';

var STOPPED = 'stopped',
    PLAYING = 'playing',
    PAUSED  = 'paused';

/**
* @description
* Create a new Soundscape instance
*
* @param config object - contains dependencies necessary for soundscape to function.
* @returns Soundscape
*/
export class Soundscape {
    constructor (config) {
        // Setup variables using config object.
        this.audioCtx           = config.audioContext;
        this.moduleFactory      = config.moduleFactory;
        this.events             = config.events;
        this.utils              = config.utils;
        this.gain               = config.audioContext.createGain();

        this.state              = STOPPED;
        this.model              = {};
        this.model.soundModules = [];

        this.gain.connect(this.audioCtx.destination);
        this.events.on('soundmodule', 'solo', this, this.soloUpdate);
    }

    soloUpdate (e) {
        this.events.broadcast('soundscape', 'solo', { soloCount: this.soloCount });
    }

    play () {
        this.state = PLAYING;
        if (this.hasSoundModules()) {
            this.soundModules.forEach(function (module) {
                module.start();
            });
        }
        return this;
    }

    pause () {
        this.state = PAUSED;
        if (this.hasSoundModules()) {
            this.soundModules.forEach(function (module) {
                module.stop();
            });
        }
        return this;
    }

    stop () {
        this.state = STOPPED;
        if (this.hasSoundModules()) {
            this.soundModules.forEach(function (module) {
                module.stop();
            });
        }
        return this;
    }

    addSoundModule (moduleData, updateSolo=true) {
        var soundModule, mConfig;

        if( !moduleData.hasOwnProperty('type')) {
            return false;
        }

        // Module Config
        mConfig = {
            audioCtx: this.audioCtx,
            masterGain: this.gain
        };

        soundModule = this.moduleFactory.create(mConfig, moduleData);

        if (this.utils.isObject(soundModule)) {
            this.soundModules.push(soundModule);

            if (this.state === PLAYING) {
                soundModule.start();
            }

            if (this.soloCount > 0 && updateSolo) {
                this.soloUpdate();
            }
        }

        return soundModule;
    }

    removeSoundModule (moduleId) {
        this.soundModules.forEach(removeModule);

        function removeModule (module, index, array) {
            if (module.id === moduleId) {
                module.remove();
                module = null;
                array.splice(index, 1);
            }
        }

        return moduleId;
    }

    removeAllSoundModules () {
        if(this.soundModules.length < 1) {
            return false;
        }

        this.soundModules.forEach(removeModule);
        this.soundModules = [];

        function removeModule (module) {
            module.remove();
        }
    }

    reset () {
        this.stop();
        this.removeAllSoundModules();
        this.model = {};
        this.model.soundModules = [];
    }

    parseJson (json) {
        if (json instanceof Object) {
            this.reset();

            if (json.soundModules) {
                var soundModules = json.soundModules;

                soundModules.forEach(function (module, index) {
                    this.addSoundModule(module, false);
                }, this);
            }

            // Create the local model
            this.model = Object.assign({}, json, this.model);

            if (this.soloCount > 0) {
                this.soloUpdate();
            }

            return this.model;
        }
    }

    hasSoundModules () {
        return Array.isArray(this.soundModules) && this.soundModules.length > 0;
    }

    /*************************************
      *      Getters and Setters
    **************************************/

    getSoundModuleById (moduleId) {
        return this.getSoundModuleByProperty('id', moduleId);
    }

    getSoundModulesByProperty (propertyName, propertyValue) {
        return this.soundModules.filter(propertyMatch)[0];

        function propertyMatch(element) {
            return element[propertyName] === propertyValue;
        }
    }

    get volume () {
        return this.gain.gain.value;
    }

    set volume (volume) {
        if (typeof volume !== 'number') {
            this.gain.gain.value = volume;
        } else {
            throw 'Soundscape: volume must be a number';
        }
    }

    get soundModuleIds () {
        return this.soundModules.map(captureIds);

        function captureIds (module) {
            return module.id;
        }
    }

    get soundModules () {
        return this.model.soundModules;
    }

    set soundModules (soundModules) {
        if (Array.isArray(soundModules)) {
            this.model.soundModules = soundModules;
        }
    }

    get playTime () {
        return this.model.playTime;
    }

    set playTime (time) {
        if (typeof time === 'number') {
            this.model.playTime = time;
        }
    }

    get soloCount () {
        return this.soundModules.filter(checkSoloCount).length;

        function checkSoloCount (soundModule, index, array) {
            return soundModule.solo === true;
        }
    }
}

Soundscape.PLAYING = 'playing';
Soundscape.STOPPED = 'stopped';
Soundscape.PAUSED  = 'paused';

export var SoundscapeProvider = {
    get: function () {
        var config;

        // Create a new audio context if none is supplied.
        if(audioContext == null) {
            audioContext = AudioContextProvider.get();
        }

        config = {
            utils: utils,
            events: new Events(),
            moduleFactory: SoundModuleFactory,
            audioContext: audioContext
        };

        return new Soundscape(config);
    }
};

export default Soundscape;
