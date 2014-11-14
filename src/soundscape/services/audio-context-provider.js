window.AudioContext = AudioContext || webkitAudioContext;

var defaultContext = null;
var AudioContextProvider = {
    get: function () {
        if (defaultContext == null) {
            defaultContext = new AudioContext();
        }
        return defaultContext;
    }
}

export default AudioContextProvider;
