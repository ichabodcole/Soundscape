import utils from './services/utils';
import SoundModule from './modules/sound-module';
import SoundModuleFactory from './modules/module-factory';
import AudioProvider from './services/audio-provider';
import Timer from './services/timer';

import Events from './services/events';


var soundscapeDefaults = {};
/**
* @description
* Create a new Soundscape instance
*
* @param options object - contains dependencies necessary for soundscape to function.
* @returns Soundscape
*/
export class Soundscape {
    constructor (options={}) {
        // Setup variables using options object.
        this.audioCtx   = options.audioCtx || AudioProvider.getContext();
        this.timer      = options.timer || new Timer();
        this.events     = options.events || new Events().setChannel('soundscape');
        this.__duration = options.duration || utils.mins2Mils(5);
        this.__modules  = [];
        this.state      = Soundscape.STOPPED;

        this.timer.playTime = this.duration;
        // this.timer.on(Timer.COMPLETE, onTimerComplete);
    }

    //*** Public Methods ***//
    play() {
        this.state = Soundscape.PLAYING;
        this.timer.start();
        this.events.broadcast(Soundscape.PLAY);
        this.startModules();
    }

    pause() {
        this.state = Soundscape.PAUSED;
        this.timer.pause();
        this.events.broadcast(Soundscape.PAUSE);
        this.stopModules();
    }

    stop() {
        this.state = Soundscape.STOPPED;
        this.timer.stop();
        this.events.broadcast(Soundscape.STOP);
        this.stopModules();
    }

    soloModule(moduleId) {
        var filtered = this.modules.filter( (scpModule) => {
            return scpModule.id === moduleId;
        });
        if(filtered.length > 0) {
            var scpModule = filtered[0];
            scpModule.soloed = true;
            scpModule.module.stop();
            this.events.broadcast(Soundscape.SOLO_MODULE, scpModule);
            return scpModule;
        }
        return false;
    }

    unsoloModule(moduleId) {
        var filtered = this.modules.filter( (scpModule) => {
            return scpModule.id === moduleId;
        });

        if(filtered.length > 0) {
            var scpModule = filtered[0];
            scpModule.soloed = false;
            scpModule.module.start();
            this.events.broadcast(Soundscape.UNSOLO_MODULE, scpModule);
            return scpModule;
        }
        return false;
    }

    addModule(module) {
        if(module instanceof SoundModule) {
            var entry = {
                id: utils.uuid(),
                soloed: false,
                module: module
            };
            this.modules.push(entry);
            this.events.broadcast(Soundscape.ADD_MODULE, entry);
            return entry;
        } else {
            throw(new Error('addModule module arument must be a SoundModule instance'));
        }
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
            this.events.broadcast(Soundscape.REMOVE_MODULE, module);
        }
        return module;
    }

    getModuleById(moduleId) {
        var filtered = this.modules.filter((element) => {
            if(element.id === moduleId) {
                return element;
            }
        });
        return(filtered.length > 0)? filtered[0] : void 0;
    }

    // Helper functions
    startModules() {
        if(this.modules.length > 0) {
            this.modules.forEach( (scpModule) => {
                scpModule.module.start();
            });
        }
    }

    stopModules() {
        if(this.modules.length > 0) {
            this.modules.forEach( (scpModule) => {
                scpModule.module.stop();
            });
        }
    }

    //*** Getters and Setters ***/
    get soloedModules() {
        var soloed = this.modules.filter( (scpModule)=> {
            return scpModule.soloed === true;
        });
        return soloed;
    }

    get duration() {
        return this.__duration;
    }

    set duration(duration) {
        this.__duration = duration;
    }

    get modules() {
        return this.__modules;
    }

    set modules(modules) {
        this.__modules = modules;
    }
}

Soundscape.defaults = soundscapeDefaults;
// Event Strings Constants
Soundscape.PLAY          = 'soundscape:play';
Soundscape.PAUSE         = 'soundscape:pause';
Soundscape.STOP          = 'soundscape:stop';
Soundscape.SOLO_MODULE   = 'soundscape:solo-module';
Soundscape.UNSOLO_MODULE = 'soundscape:unsolo-module';
Soundscape.ADD_MODULE    = 'soundscape:add-module';
Soundscape.REMOVE_MODULE = 'soundscape:remove-module';
Soundscape.COMPLETE      = 'soundscape:complete';
// State String Constants
Soundscape.PLAYING = 'soundscape:playing';
Soundscape.STOPPED = 'soundscape:stopped';
Soundscape.PAUSED  = 'soundscape:paused';

export default Soundscape;
