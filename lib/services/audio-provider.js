window.AudioContext = AudioContext || webkitAudioContext;

var audioCtx = null;
var gain = null;
var compressor = null;

export var AudioProvider = {
    getContext: getContext,
    getCompressor: getCompressor,
    getGain: getGain
};

function getContext() {
    if(audioCtx == null) {
        audioCtx = new AudioContext();
    }
    return audioCtx;
}

function getGain() {
    if(gain == null) {
        var ctx = AudioProvider.getContext();
        gain = ctx.createGain();
    }
    return gain;
}

function getCompressor() {
    if(compressor == null) {
        var ctx = AudioProvider.getContext();
        compressor = ctx.createDynamicsCompressor();
    }
    return compressor;
}

export default AudioProvider;
