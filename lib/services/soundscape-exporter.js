import { ModuleType } from '../constants';

function exportModule(moduleType) {
    // if(moduleType === ModuleType.COLOR_NOISE_MODULE) {
    //     return ({});
    // }
}

export var SoundscapeExporter = {
    export: function(soundscape) {
        var modules, data;

        modules = soundscape.modules.map(function(module) {
           // console.log(module.type, ModuleType.COLOR_NOISE_MODULE);
            return exportModule(module.type);
        });

        return {
            modules: modules
        };
    }
};

export default SoundscapeExporter;
