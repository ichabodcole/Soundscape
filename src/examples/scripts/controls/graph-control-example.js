import Timer from '../../../soundscape/services/timer';
import GraphControl from '../../../soundscape/property-controls/graph-control';

export var graphControlExample = function() {
    console.log('graphControlExample');

    var points = [
        { type:0, t:0, v:0 },
        { type:0, t:0.05, v:40 },
        { type:0, t:0.15, v:125 },
        { type:0, t:0.35, v:277 },
        { type:0, t:0.50, v:15 },
        { type:0, t:0.65, v:83 },
        { type:0, t:0.75, v:125 },
        { type:0, t:1.00, v:200 }
    ];

    var timer = new Timer();
    timer.playTime = 1000;
    // timer.interval = 100;

    var graphControl = new GraphControl({ min:0, max:300 });
    graphControl.addPoints(points);

    graphControl.on(GraphControl.VALUE_CHANGE, onGraphValueChange);

    timer.on(Timer.START, onTimerStart);
    timer.on(Timer.TICK, onTimerTick);
    timer.on(Timer.COMPLETE, onTimerComplete);
    timer.start();

    function onGraphValueChange(e, data) {
        console.log('onGraphValueChange:', data.percent, data.value);
    }

    function onTimerStart(e) {
        console.log('Timer:Start');
    }

    function onTimerTick(e, data) {
        graphControl.valueAtTime(data.epsilon);
        //console.log('Timer: tick -', 'epsilon:', data.epsilon, '__ currentTime:', data.currentTime);
    }

    function onTimerComplete(e) {
        console.log('Timer: COMPLETE', e);
    }
};

export default graphControlExample;
