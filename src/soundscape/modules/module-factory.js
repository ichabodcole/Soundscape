// Module dependencies
import utils from '../services/utils';

// Sound Module Classes
import BinauralBeatModule from './binaural-beat';
import ColorNoiseModule from './color-noise';

var modules = {
    'noise-module': ColorNoiseModule,
    'binaural-beat-module': BinauralBeatModule
};

var SoundModuleFactory = {

    create: function (config, data) {
        if (modules.hasOwnProperty(type)) {
            // Create a new id for the module
            // if one does not already exist.
            if ( !moduleData.hasOwnProperty('id')) {
                moduleData.id = this.utils.uuid();
            }

            return new modules[config.type](config, data);
        }

        return false;
    }
};

export default SoundModuleFactory;
