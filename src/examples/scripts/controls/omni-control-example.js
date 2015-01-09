import Timer from '../../../soundscape/services/timer';
import OmniControl from '../../../soundscape/property-controls/omni-control';
import BaseControl from '../../../soundscape/property-controls/base-control';

export var omniControlExample = function() {
    console.group('omniControlExample');

    var omniControl = new OmniControl({ min:200, max:500 });

    omniControl.on(OmniControl.VALUE_CHANGE, onOmniValueChange.bind(this));
    omniControl.on(OmniControl.CONTROL_TYPE_CHANGE, onOmniTypeChange.bind(this));

    // OmniControl base control example
    console.group('OmniControl Base Control Example');
    omniControl.controlType = OmniControl.BASE_CONTROL;

    omniControl.controlInstance.value = 225;
    omniControl.controlInstance.value = 455;

    console.groupEnd();
    // OmniControl follow control example
    console.group('OmniControl Follow Control Example');
    // OmniControl following a BaseControl
    console.group('OmniControl following a BaseControl');
    var baseControl = new BaseControl({ min: 50, max:120 });
    omniControl.controlType = OmniControl.FOLLOW_CONTROL;

    omniControl.controlInstance.target = baseControl;
    omniControl.controlInstance.start();

    baseControl.value = 110;
    baseControl.value = 80;

    console.groupEnd();

    // OmniControl following another OmniControl
    console.group('following another omni control');
    var omniControl2 = new OmniControl({ min: 100, max: 1000});

    omniControl.controlInstance.target = omniControl2;
    omniControl.controlInstance.start();

    omniControl2.controlInstance.value = 500;
    omniControl2.controlInstance.value = 900;
    console.groupEnd();
    console.groupEnd();

    // OmniControl graph control example
    console.group('OmniControl Graph Control Example');
    var timer = new Timer();
    timer.playTime = 400;
    timer.on(Timer.TICK, onTimerTick);
    timer.on(Timer.START, onTimerStart);
    timer.on(Timer.COMPLETE, onTimerComplete);

    var points = [
        { type:0, t:0, v:200 },
        { type:0, t:0.05, v:240 },
        { type:0, t:0.15, v:225 },
        { type:0, t:0.35, v:377 },
        { type:0, t:0.50, v:215 },
        { type:0, t:0.65, v:283 },
        { type:0, t:0.75, v:325 },
        { type:0, t:1.00, v:450 }
    ];

    omniControl.controlType = OmniControl.GRAPH_CONTROL;
    omniControl.controlInstance.addPoints(points);

    omniControl.controlInstance.valueAtTime(0.55);
    timer.start();
    console.groupEnd();

    function onTimerStart(e) {
        console.group('Timer:start');
    }

    function onTimerComplete(e) {
        console.log('Timer:complete');
        console.groupEnd();
    }

    function onTimerTick(e, data) {
        omniControl.controlInstance.valueAtTime(data.epsilon);
    }

    //
    function onOmniTypeChange(e, type) {
        console.log('onOmniChangeType:', type);
    }

    function onOmniValueChange(e, data) {
        console.log('onOmniCtrlValueChange:', omniControl.controlType, data.percent, data.value);
    }

};

export default omniControlExample;
