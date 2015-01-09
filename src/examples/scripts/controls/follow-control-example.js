import BaseControl from '../../../soundscape/property-controls/base-control';
import FollowControl from '../../../soundscape/property-controls/follow-control';

export var followControlExample = function () {
    console.group('followControlExample');
    var baseControl = new BaseControl({ min:0, max: 100 });
    var followControl = new FollowControl({ min:0, max: 100});

    followControl.on(FollowControl.VALUE_CHANGE, onValueChange);
    followControl.on(FollowControl.START, onStart);

    followControl.target = baseControl;

    followControl.start();

    baseControl.value = 50;
    baseControl.percent = 0.7;

    console.groupEnd();

    function onStart(e) {
        console.log('start');
    }

    function onValueChange(e, data) {
        console.log('onValueChange');
        console.log(e);
        console.log(data.percent, data.value);
    }
};

export default followControlExample;
