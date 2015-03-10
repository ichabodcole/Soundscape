import { ModuleType, ControlType } from '../constants';

function noop() {}

function addModules(soundscape, moduleList, done) {
    done = done || noop;

    moduleList.forEach((module)=> {
        var moduleOptions = module.options || {};
        soundscape.addModule(module.type, moduleOptions);
    });

    done(soundscape.modules);
}

function linkFollowControls(soundscape, moduleList) {
    moduleList.forEach((module)=> {
        var options = module.options;
        if(options && options.id) {
            var scpMod = soundscape.getModuleById(options.id);

            if(options.volume
                && options.volume.controlType === ControlType.FOLLOW_CONTROL
                && options.volume.followId) {
                    var targetMod = soundscape.getModuleById(options.volume.followId);
                    scpMod.volume.control.target = targetMod.volume.control;
            }
        }
    });
}

function _import(soundscape, data) {
    if (data && data.modules) {
        addModules(soundscape, data.modules, ()=> {
            linkFollowControls(soundscape, data.modules);
        });
    }
}

export var SoundscapeImporter = {
    import: _import
};

export default SoundscapeImporter;
