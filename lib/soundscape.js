import utils from './utils';
import ModuleFactory from './module-factory';
import { SoundscapeStates, SoundscapeEvents } from './constants';

var EventEmitter = require('events').EventEmitter;

/**
* @description
* Create a new Soundscape instance
*
* @param audioContext - an AudioContext instance
* @param options object - contains dependencies necessary for soundscape to function.
* @returns Soundscape
*/
class Soundscape extends EventEmitter {

    constructor (audioContext, options={}) {
        // Setup variables using options object.
        this.soloListener  = null;

        this.audioCtx   = audioContext;
        this.gainNode   = this.audioCtx.createGain();
        this.masterGain = this.audioCtx.createGain();
        this.compressor = this.audioCtx.createDynamicsCompressor();
        this.__modules  = [];
        this.state      = SoundscapeStates.STOPPED;

        this.volume = options.volume || 0.5;

        // TODO: no unit tests for this set up.
        this.soloListener  = this.__onSoloModule.bind(this);
        this.gainNode.connect(this.compressor);
        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.audioCtx.destination);
    }

    //*** Public Methods ***//
    start() {
        this.state = SoundscapeStates.ACTIVE;
        this.emit(SoundscapeEvents.START);
        this.__startModules();
    }

    stop() {
        this.state = SoundscapeStates.STOPPED;
        this.__stopModules();
        this.emit(SoundscapeEvents.STOP);
    }

    destroy() {
        this.modules.forEach( (module)=> {
            this.__cleanupModule(module);
        });
    }

    addModule(type, options) {
        var module = ModuleFactory.create(type, this.audioCtx, options);
        this.__setupModule(module);
        this.modules.push(module);
        this.emit(SoundscapeEvents.ADD_MODULE, module);
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
            this.emit(SoundscapeEvents.REMOVE_MODULE, module);
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

    // Private Methods
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
        module.on(SoundscapeEvents.SOLO, this.soloListener);
        module.connect(this.gainNode);
        if(this.state === SoundscapeStates.ACTIVE) {
            module.start();
        }
    }

    __cleanupModule(module) {
        module.removeListener(SoundscapeEvents.SOLO, this.soloListener);
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
}

export { Soundscape };
export default Soundscape;
