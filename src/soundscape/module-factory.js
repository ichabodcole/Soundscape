// Module dependencies
import utils from './services/utils';
import { ModuleType, ModuleEvent } from './constants';

// Sound Module Classes
import BinauralBeatModule from './modules/binaural-beat';
import ColorNoiseModule from './modules/color-noise';

var __modules = {};
__modules[ModuleType.COLOR_NOISE_MODULE]   = ColorNoiseModule;
__modules[ModuleType.BINAURAL_BEAT_MODULE] = BinauralBeatModule;

export var ModuleFactory = {
    create: function (type, options={}) {
        if(__modules.hasOwnProperty(type)) {
            var module = new __modules[type](options);

            Object.defineProperty(module, 'id', {
                get: function() {
                    return this.model.id;
                },
                set: function(id) {
                    this.model.id = id;
                }
            });

            Object.defineProperty(module, 'solo', {
                get: function() {
                    return this.model.soloed;
                },
                set: function(solo) {
                    this.model.soloed = solo;
                    var data = {
                        id: this.model.id,
                        state: solo
                    }
                    this.emit(ModuleEvent.SOLO, data);
                }
            });

            module.id = options.id || utils.uuid();
            module.solo = options.soloed || false;

            //decorateModule(module);
            return module;
        } else {
            throw(new Error(`ModuleFactory.create: unknown module type (${type})`));
        }
    }
};

function decorateModule (module, options) {
    var ref = module;
    var refSerialize = ref.serialize.bind(module);

    module.serialize = function () {
        var data = refSerialize();
        data.id = this.model.id;
        data.soloed = this.model.soloed;
        return data;
    }
}

export default ModuleFactory;
