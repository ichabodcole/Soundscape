// Import dependencies
import BaseControl from './base-control';
import Events from '../services/events';

export class RangeControl extends BaseControl {
    constructor (config, model={}) {
        super('RangeControl', config, model);
    }
}

export var RangeControlProvider = {
    get: function (model) {
        var config = {
            events: new Events().setChannel('range_control')
        };
        return new RangeControl(config, model);
    }
}

export default RangeControl;
