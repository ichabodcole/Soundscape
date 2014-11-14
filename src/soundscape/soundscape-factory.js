import utils from './services/utils';
import SoundModuleFactory from './modules/module-factory';
import AudioContextProvider from './services/audio-context-provider';
import soundscapeEvents from './services/soundscape-events';
import Soundscape from './soundscape';


var SoundscapeFactory = {
    create: function (audioContext, config) {
        var config;

        // Create a new audio context if none is supplied.
        if(audioContext == null) {
            audioContext = AudioContextProvider.get();
        }

        config = {
            utils: utils,
            pubSub: soundscapeEvents,
            moduleFactory: SoundModuleFactory,
            audioContext: audioContext
        };

        return new Soundscape(config);
    }
}

export default SoundscapeFactory;
