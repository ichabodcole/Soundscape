import BaseControl from '../../../soundscape/property-controls/base-control';

export var baseControlExample = function () {
    console.group('baseControlExample');
    var baseControl = new BaseControl({ min:12.5, max:50 });

    baseControl.on(BaseControl.VALUE_CHANGE, onValueChange.bind(this));

    function onValueChange(e, data) {
        console.log(e);
        console.log(data.percent, data.value);
    }

    baseControl.percent = 0.25;
    console.groupEnd();
};

export default baseControlExample;
