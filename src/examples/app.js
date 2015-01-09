

//Controls Examples;
import baseControlExample from './scripts/controls/base-control-example';
baseControlExample();

import followControlExample from './scripts/controls/follow-control-example';
followControlExample();

// import graphControlExample from './scripts/controls/graph-control-example';
// graphControlExample();

import omniControlExample from './scripts/controls/omni-control-example';
omniControlExample();

// import SoundModule from '../../soundscape/modules/sound-module';
// var scp = SoundscapeFactory.create();

//import { Interpolation } from '../soundscape/common/math';
//import Ticker from '../soundscape/services/ticker';

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



// var timer = new Timer({ interval:500 });
// var omniCtrl = new OmniControl({ min:100,  max:1500 });

// function RangeTransform(input, min, max) {
//     var diff = max - min;
//     return (input * diff) + min;
// }

// omniCtrl.on(OmniControl.VALUE_CHANGE, (e, value, percent) => {
//     // console.log('OmniControl Value:', value, RangeTransform(value, 100, 1500));
// });

//timer.interval = 50;
// timer.playTime = 10000;

// timer.on(Timer.START, function(e) {
//     console.log('Timer:START');
// });

// timer.on(Timer.STOP, function(e) {
//     console.log('Timer:STOP');
// })

// timer.on(Timer.COMPLETE, function(e) {
//     console.log('Timer:COMPLETE');
// });

// timer.on(Timer.TICK,  function(e, data) {
//     console.log(data.playTime, data.currentTime, data.epsilon);
//     if (omniCtrl.controlType === OmniControl.GRAPH_CONTROL) {
//         omniCtrl.controlInstance.valueAtTime(data.epsilon);
//     }
// });

// setTimeout(function() {
//     omniCtrl.controlType = OmniControl.GRAPH_CONTROL;
//     omniCtrl.controlInstance.addPoints(points);
// }, 2500);

// timer.start();

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
