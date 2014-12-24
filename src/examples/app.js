// import SoundModule from '../../soundscape/modules/sound-module';
// var scp = SoundscapeFactory.create();

// import { FollowControl, FollowControlProvider } from '../soundscape/property-controls/follow-control';
// import { RangeControl, RangeControlProvider } from '../soundscape/property-controls/range-control';
import { GraphControl, GraphControlProvider } from '../soundscape/property-controls/graph-control';

//import { Interpolation } from '../soundscape/common/math';
import { TimerProvider, Timer } from '../soundscape/services/timer';

// Interpolation.cubic(t, p1, cp1, cp2, p2);

// var p1 = { x:0, y:0.25 };
// var p2 = { x:1, y:0.75 };

// var interpPoints = [];

// for(var i=0; i<=100; i+=5) {
//     var t = Math.round(i) / 100;

//     var medianX = ((p2.x - p1.x) / 2) + p1.x;

//     var cp1 = { x: medianX, y: p1.y};
//     var cp2 = { x: medianX+0.5, y: p2.y};

//     var x = Interpolation.cubic(t, p1.x, cp1.x, cp2.x, p2.x);
//     var y = Interpolation.cubic(t, p1.y, cp1.y, cp2.y, p2.y);
//     interpPoints.unshift([x, y]);
// }

// // interpPoints.unshift([cp1.x, cp1.y], [cp2.x, cp2.y]);
var points = [
        { type:0, t:0, v:0.45 },
        { type:0, t:0.05, v:0.25 },
        { type:0, t:0.15, v:0.25 },
        { type:0, t:0.25, v:0.65 },
        { type:0, t:0.35, v:0.55 },
        { type:0, t:0.5, v:0.7 },
        { type:0, t:0.65, v:0.35 },
        { type:0, t:0.75, v:0.45 },
        { type:0, t:1, v:0.25 }
    ];

var timer = TimerProvider.get();

var gc = GraphControlProvider.get({
    propertyName: 'volume',
    points: points
});

gc.on(GraphControl.VALUE_CHANGE, (e, value) => {
    console.log('Graph Value:', value);
});

timer.interval = 50;
timer.playTime = 10000;

timer.on(Timer.STOP, function(e) {
    console.log('Timer:STOP');
})

timer.on(Timer.COMPLETE, function(e) {
    console.log('Timer:COMPLETE');
});

timer.on(Timer.TICK,  function(e, data) {
    //console.log(data.playTime, data.currentTime, data.epsilon);
    gc.valueAtTime(data.epsilon);
});

timer.start();

// var chartDataIntrp = [];

// var n =  60;

// for (var i = 0; i <= n; i++) {
//     var t = i/n;
//     chartDataIntrp.push([t, gc.valueAtTime(t)]);
// }

// var chartDataInput = points.map( (element, index) => {
//     return [element.t, element.v];
// });

// var chartOptionsInput = {
//     chart: {
//         renderTo:'inputchart',
//         type: 'line'
//     },
//     title: {
//         text: 'Graph Input Points'
//     },
//     series: [
//         {
//             name: 'Input Points',
//             data: interpPoints
//         },
//         // {
//         //     name: 'Interpolated Point',
//         //     data: chartDataIntrp
//         // }
//     ]
// }

// var chartOptionsIntrp = {
//     chart: {
//         renderTo:'intrpchart',
//         type: 'line'
//     },
//     title: {
//         text: 'Graph Interpolated Points'
//     },
//     series: [
//         {
//             name: 'Interpolated Point',
//             data: chartDataIntrp
//         }
//     ]
// }


// var inputChart = new Highcharts.Chart(chartOptionsInput);
// var intrpChart = new Highcharts.Chart(chartOptionsIntrp);

// var fc = FollowControlProvider.get({
//     propertyName: 'volume'
// });

// var rc = RangeControlProvider.get({
//     propertyName: 'volume'
// });

// rc.on(RangeControl.VALUE_CHANGE, (e, value)=> {
//     console.log('Range', value);
// }, this);

// fc.target = rc;
// fc.start();

// fc.on(FollowControl.VALUE_CHANGE, (e, value)=> {
//     console.log('Following', value);
// });

// rc.value = 0.88;
// rc.value = 0.25;


// gc = new GraphControlProvider(model);
// gc.addPoint({ type: 0, coords: [time, amp] });
// gc.start();
// gc.on(GraphControl.VALUE_CHANGE, doThis, this);

// $.ajax('data/soundscape.json').success(function (data) {
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
