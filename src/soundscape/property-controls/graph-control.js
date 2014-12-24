// Import dependencies
import BaseControl from './base-control';
import Events from '../services/events';
import { Interpolation } from '../common/math';

export class GraphControl extends BaseControl {
    constructor (config, model={}) {
        super('GraphControl', config, model);

        if (this.model.points  != null) {
            this.sortPointsByTime();
        }

        this.validEvents.push(
            GraphControl.ADD_POINTS,
            GraphControl.REMOVE_POINT
        );
    }

    addPoints (pointsObj) {
        if (!Array.isArray(pointsObj)
            && !(pointsObj instanceof Object)) {
            return false;
        }

        if (Array.isArray(pointsObj)) {
            this.points = this.points.concat(pointsObj);
        } else if (pointsObj instanceof Object) {
            this.points.push(pointsObj);
            this.sortPointsByTime();
        }

        this.events.broadcast(GraphControl.ADD_POINTS , this.points);
        return this.points;
    }

    removePoint (pointIndex) {
        if (typeof pointIndex === 'number'
            && pointIndex > 0
            && pointIndex < this.points.length - 1) {
            this.points.splice(pointIndex, 1);
            this.events.broadcast(GraphControl.REMOVE_POINT, this.points);
            return this.points;
        }
    }

    sortPointsByTime () {
        this.points.sort(function (a, b) {
            return a.t - b.t;
        });
        return this.points;
    }

    findPointsByTime (t) {
        // Points should already be sorted by t.
        var endIndex    = null,
            startIndex  = null,
            pointsTotal = this.points.length,
            lastIndex   = pointsTotal - 1;

        for (var i = 0; i < pointsTotal; i++) {
            let point = this.points[i];

            if (point.t > t) {
                startIndex = i - 1;
                endIndex   = i;
                break;

            } else if (i === lastIndex) {
                startIndex = i - 1;
                endIndex   = i;
                break;

            } else if (point.t === t) {
                startIndex = i;
                endIndex   = i + 1;
                break;
            }
        }

        if (startIndex !== null && endIndex !== null) {
            return [this.points[startIndex], this.points[endIndex]];
        }
    }

    valueAtTime (t) {
       // Get interpolation function based first points type
        var points = this.findPointsByTime(t),
            p1 = points[0],
            p2 = points[1];

        // start time
        var st = t - p1.t;
        // local point time
        var lpt = (1 / (p2.t - p1.t)) * st;

        this.value = Math.round(Interpolation.smoothStep(lpt, p1.v, p2.v) * 1000) / 1000;

        return this.value;
    }

    get points () {
        return this.model.points;
    }

    set points (pointsArray) {
        this.model.points = pointsArray;
        this.sortPointsByTime();
    }
}
// Event String Constants
GraphControl.ADD_POINTS   = 'add_points';
GraphControl.REMOVE_POINT = 'remove_point';

export var GraphControlProvider = {
    get: function (model) {
        var config = {
            events: new Events().setChannel('graphControl')
        };
        return new GraphControl(config, model);
    }
};

export default GraphControl;
