import BinauralBeatModule from './binaural-beat';
import ColorNoiseModule from './color-noise';

var modules = {
    'noise-module': ColorNoiseModule,
    'binaural-beat-module': BinauralBeatModule
};

var SoundModuleFactory = {
    create: function (type, options) {
        if (modules.hasOwnProperty(type)) {
            return new modules[type](options);
        } else {
            return false;
        }
    }
};

export default SoundModuleFactory;
