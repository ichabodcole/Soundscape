// import SoundModule from '../../soundscape/modules/sound-module';

var scp = SoundscapeFactory.create();

$.ajax('data/soundscape.json').success(function (data) {
    // scp.parseJson(data);
    // scp.play();
    // scp.addSoundModule({type: 'binaural-beat-module'});
    // var moduleIds = scp.soundModuleIds;
    // // scp.getSoundModuleIdsByProperty('volume');
    // console.log(moduleIds);
    // var sm = scp.getSoundModuleById(moduleIds[0]);
    // sm = scp.addSoundModule(
    //     {
    //         type: 'binaural-beat-module',
    //         pitch: {
    //             value: 240
    //         }
    //     });
    // sm.solo = false;
    // sm.volume.followId =
    // sm.volume.followModuleId = "24892be7-d2c8-4234-81ce-5bf662d3e090";
    // console.log(sm.volume);
    // sm.getPropertyByName('volume');
    // sm.setProperty('volume', {});
    // sm.followModuleProperty(moduleId, property);
    // sm.volumeControl.followModule(moduleId);
    // sm.volume.followModule(sm2);

    // sm = new SoundModule();
    // pc.on('valueChange')
    // this.volume = new PropertyControl()
    // this.volume.on('valueUpdate', function () {
        // this.gain.gain.value = value;
    // })
    // this.volume.onValueUpdate(function(){})
    // this.volume.on(MultiControlProperty.CONTROL_TYPE_CHANGE, func)
    // sm.volume.propertyControl = new RangeProperty();
    // sm.volume = new MultiControlProperty();
    /* a = b; b = c; c = a;
    oc = new OmniControlProvider(model);
    rc = new RangeControlProvider(model);
    fc = new FollowControlProvider(model);
    fc.target = rc;
    fc.on(FollowControl.VALUE_CHANGE, someFunc, this);
});
