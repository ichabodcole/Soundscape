// import extend from 'utils';
import utils from './utils';
import SoundModuleFactory from './modules/module-factory';

var STOPPED = 'stopped',
    PLAYING = 'playing',
    PAUSED  = 'paused';

class BrainbeatsEngine {
    constructor (audioCtx, options) {
        this.audioCtx = audioCtx;
        this.gain     = ctx.createGain();
        this.state    = STOPPED;
        this.model    = {};
        this.model.soundModules = [];

        this.gain.connect(this.audioCtx.destination);
        // _scope.$on('bb:soundmodule:solo', function (e) {
        //     _scope.$broadcast('bb:soundscape:solo', _self.soloCount);
        //     e.stopPropagation();
        // });

        // _scope.$on('bb:soundmodule:remove', function (e, moduleId) {
        //     e.stopPropagation();
        //     _self.removeSoundModule(moduleId);
        // });
    }

    play () {
        this.state = PLAYING;
        if(this.model.soundModules) {
            this.model.soundModules.forEach(function (module) {
                module.start();
            });
        }
    }

    pause () {
        this.state = PAUSED;
        console.log('paused');
        this.stop();
    }

    stop () {
        this.state = STOPPED;
        if(this.model.soundModules) {
            this.model.soundModules.forEach(function (module) {
                module.stop();
            });
        }
    }

    createSoundModule (moduleData) {
        var soundModule,
            type = moduleData.type,
            data = {
                audioCtx: this.audioCtx,
                masterGain: this.gain,
                data: moduleData
            };
        return SoundModuleFactory.create(type, data);
    }

    addSoundModule (moduleData) {
        var soundModule = this.createSoundModule(moduleData);

        if (utils.isObject(soundModule)) {
            this.model.soundModules.push(soundModule);

            if(this.state === PLAYING) {
                soundModule.start();
            }
            if(this.soloCount > 0) {
                soundModule.soloCheck();
            }
        }
    }

    removeSoundModule () {
        this.model.soundModules.forEach(removeModule);

        function removeModule (module, index, array) {
            if(module.id === id) {
                module.remove();
                module = null;
                array.splice(index, 1);
            }
        }
    }

    removeAllSoundModules () {
        this.model.soundModules.forEach(removeModule);
        this.model.soundModules = [];

        function removeModule (module) {
            module.remove();
        }
    }

    reset () {
        this.stop();
        if(this.model.soundModules.length > 0) {
            this.removeAllSoundModules();
        }
        this.model = {};
        this.model.soundModules = [];
    }

    parseJson (json) {
        if(json instanceof Object) {
            this.reset();

            if(json.soundModules) {
                var soundModules = json.soundModules;

                soundModules.forEach(function (module, index) {
                    this.addSoundModule(module);
                }, this);
            }

            this.model = Object.assign({}, json, this.model);

            if(this.soloCount > 0) {
                // _scope.$broadcast('bb:soundscape:solo', this.soloCount);
            }

            return this.model;
        }
    }

    /*************************************
      *      Getters and Setters
    **************************************/

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
        if(typeof time === 'number') {
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

export default BrainbeatsEngine;
