import { OmniControl, OmniControlEvent } from './property-controls/omni-control';
import { SoundModuleEvent } from './modules/sound-module';
import { ColorNoiseModule } from './modules/color-noise';

export var ModuleType = {
    BINAURAL_BEAT_MODULE: 'module:binaural-beat',
    COLOR_NOISE_MODULE: 'module:color-noise'
};

export var ModuleEvent = Object.assign({
    SOLO: 'soundmodule:solo'
}, SoundModuleEvent);

export var ControlEvent = Object.assign({}, OmniControlEvent);

export var ControlType = {
    BASE_CONTROL: OmniControl.BASE_CONTROL,
    FOLLOW_CONTROL: OmniControl.FOLLOW_CONTROL,
    GRAPH_CONTROL: OmniControl.GRAPH_CONTROL
};

export var NoiseType = {
    WHITE: ColorNoiseModule.WHITE_NOISE,
    PINK: ColorNoiseModule.PINK_NOISE,
    BROWN: ColorNoiseModule.BROWN_NOISE
};

export var WaveType = {

};

export default {
    ModuleType: ModuleType,
    NoiseType: NoiseType,
    ControlType: ControlType
}
