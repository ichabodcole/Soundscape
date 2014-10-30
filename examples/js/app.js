window.AudioContext = window.AudioContext || window.webkitAudioContext;

var ctx = new AudioContext();
var scp = new Soundscape(ctx);

$.ajax('data/soundscape.json').success(function (data) {
    scp.parseJson(data);
    scp.play();
    // scp.addSoundModule({type: 'binaural-beat-module'});
    var moduleIds = scp.soundModuleIds;
    // // scp.getSoundModuleIdsByProperty('volume');
    // console.log(moduleIds);
    var sm = scp.getSoundModuleById(moduleIds[0]);
    sm = scp.addSoundModule(
        {
            type: 'binaural-beat-module',
            pitch: {
                value: 240
            }
        });
    // sm.solo = false;
    // sm.volume.followId =
    // sm.volume.followModuleId = "24892be7-d2c8-4234-81ce-5bf662d3e090";
    // console.log(sm.volume);
    // sm.getPropertyByName('volume');
    // sm.setProperty('volume', {});
});
