import utils from './services/utils';
import SoundModule from './modules/sound-module';
import ModuleFactory from './module-factory';
import AudioProvider from './services/audio-provider';
import { Timer, TimerEvent } from './services/timer';
import { ModuleEvent } from './constants';

var EventEmitter = require('events').EventEmitter;

var soundscapeDefaults = {};

// Event Strings Constants
export var SoundscapeEvent = {
    START: 'soundscape:start',
    PAUSE: 'soundscape:pause',
    STOP: 'soundscape:stop',
    ADD_MODULE: 'soundscape:add-module',
    REMOVE_MODULE: 'soundscape:remove-module',
    COMPLETE: 'soundscape:complete'
};

/**
* @description
* Create a new Soundscape instance
*
* @param options object - contains dependencies necessary for soundscape to function.
* @returns Soundscape
*/
export class Soundscape extends EventEmitter {

    // Internal Methods
    __startModules() {
        if(this.modules.length > 0) {
            this.modules.forEach( (module) => {
                module.start();
            });
        }
    }

    __stopModules() {
        if(this.modules.length > 0) {
            this.modules.forEach( (module) => {
                module.stop();
            });
        }
    }

    __setupModule(module) {
        module.on(ModuleEvent.SOLO, this.soloListener);
        module.connect(this.gainNode);
        if(this.state === Soundscape.ACTIVE) {
            module.start();
        }
    }

    __cleanupModule(module) {
        module.removeListener(ModuleEvent.SOLO, this.soloListener);
        module.destroy();
    }

    __onSoloModule(e) {
        this.modules.forEach( (module) => {
            if(module.solo === false) {
                module.disconnect();
            } else {
                module.connect(this.gainNode);
            }
        });
    }

    __onTimerComplete(e) {
        this.stop();
        this.emit(SoundscapeEvent.COMPLETE);
    }

    constructor (options={}) {
        // Setup variables using options object.
        this.timerListener = null;
        this.soloListener  = null;

        this.audioCtx   = options.audioCtx || AudioProvider.getContext();
        this.gainNode   = this.audioCtx.createGain();
        this.masterGain = this.audioCtx.createGain();
        this.compressor = this.audioCtx.createDynamicsCompressor();
        this.timer      = options.timer || new Timer();
        this.duration   = options.duration || utils.mins2Mils(5);
        this.__modules  = [];
        this.state      = Soundscape.STOPPED;

        this.timer.duration = this.duration;
        this.volume = options.volume || 0.5;

        // TODO: no unit tests for this set up.
        this.timerListener = this.__onTimerComplete.bind(this);
        this.soloListener  = this.__onSoloModule.bind(this);
        this.gainNode.connect(this.compressor);
        this.timer.on(TimerEvent.COMPLETE, this.timerListener);
        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.audioCtx.destination);
    }

    //*** Public Methods ***//
    start() {
        this.state = Soundscape.ACTIVE;
        this.timer.start();
        this.emit(SoundscapeEvent.START);
        this.__startModules();
    }

    pause() {
        this.state = Soundscape.PAUSED;
        this.timer.pause();
        this.__stopModules();
        this.emit(SoundscapeEvent.PAUSE);
    }

    stop() {
        this.state = Soundscape.STOPPED;
        this.timer.stop();
        this.__stopModules();
        this.emit(SoundscapeEvent.STOP);
    }

    destroy() {
        this.timer.removeListener(TimerEvent.COMPLETE, this.timerListener);
        this.modules.forEach( (module)=> {
            this.__cleanupModule(module);
        });
    }

    addModule(type, options) {
        var module = ModuleFactory.create(type, options);
        this.__setupModule(module);
        this.modules.push(module);
        this.emit(SoundscapeEvent.ADD_MODULE, module);
        return module;
    }

    removeModule(moduleId) {
        var module;
        this.modules.forEach((element, index, array)=> {
            if (element.id === moduleId) {
                module = element;
                array.splice(index, 1);
            }
        });
        if(module != null) {
            this.emit(SoundscapeEvent.REMOVE_MODULE, module);
        }
        return module;
    }

    getModuleById(moduleId) {
        var filtered = this.modules.filter((module) => {
            if(module.id === moduleId) {
                return module;
            }
        });
        return(filtered.length > 0)? filtered[0] : false;
    }

    //*** Getters and Setters ***/
    get soloedModules() {
        var soloed = this.modules.filter( (module)=> {
            return module.solo === true;
        });
        return soloed;
    }

    get duration() {
        return this.timer.duration;
    }

    set duration(duration) {
        this.timer.duration = duration;
    }

    get volume() {
        return this.masterGain.gain.value;
    }

    set volume(volume) {
        this.masterGain.gain.value = volume;
    }

    get modules() {
        return this.__modules;
    }

    set modules(modules) {
        this.__modules = modules;
    }
}

Soundscape.defaults = soundscapeDefaults;
// State String Constants
Soundscape.ACTIVE  = 'soundscape:active';
Soundscape.STOPPED = 'soundscape:stopped';
Soundscape.PAUSED  = 'soundscape:paused';

export default Soundscape;
