// Module dependencies
import utils from './services/utils';
import { SoundscapeEvents } from './constants';

import { ModuleTypes, BinauralBeatModule, ColorNoiseModule } from 'sound-modules';

var __modules = {};
__modules[ModuleTypes.COLOR_NOISE_MODULE]   = ColorNoiseModule;
__modules[ModuleTypes.BINAURAL_BEAT_MODULE] = BinauralBeatModule;

export var ModuleFactory = {
    create: function (type, audioContext, options={}) {
        if(__modules.hasOwnProperty(type)) {
            var module = new __modules[type](audioContext, options);

            // Decorate the Sound Module with a solo property.
            Object.defineProperty(module, 'solo', {
                get: function() {
                    return this.model.solo;
                },
                set: function(solo) {
                    this.model.solo = solo;
                    var data = {
                        id: this.id,
                        state: solo
                    };
                    this.emit(SoundscapeEvents.SOLO, data);
                }
            });

            //The module should remove any solo listeners when module.destroy is called.
            //module.removeListener(SoundscapeEvents.SOLO, this.soloListener);

            module.solo = options.solo || false;

            //decorateModule(module);
            return module;
        } else {
            throw(new Error(`ModuleFactory.create: unknown module type (${type})`));
        }
    }
};

export default ModuleFactory;
