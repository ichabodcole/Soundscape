import BaseControl from '../../../../src/soundscape/property-controls/base-control';
import { GraphControl, GraphControlEvent } from '../../../../src/soundscape/property-controls/graph-control';
import { Interpolation } from '../../../../src/soundscape/common/math';

describe ('GraphControl', function () {
    var gc, timer, options, model, listener;

    beforeEach(function () {
        options =  {
            propertyName: 'myGraphProperty',
            points: [
                { type: 1, t: 0.25, v: 0.55 },
                { type: 0, t: 0, v: 0.75 },
                { type: 0, t: 0.5, v: 0.35 },
                { type: 0, t: 0.75, v: 0.35  }
            ]
        };
        listener = {
            update: function () {
                return true;
            }
        };
        gc = new GraphControl(options);
    });

    describe ('constructor', function () {
        it ('should be an instance of BaseControl', function () {
            expect(gc instanceof BaseControl).toBe(true);
        });

        it ('should not throw an error', function () {
            expect(function () {
                new GraphControl();
            });
        });

        it ('should sort any initial points', function () {
            expect(gc.points[0].t).toEqual(0);
        });
    });

    describe ('properties', function () {
        describe ('points', function () {
            it ('should be defined', function () {
                expect(gc.points).toBeDefined();
            });

            it ('should return the models points array', function () {
                expect(gc.points).toBe(options.points);
            });

            it ('should set the models points array', function ( ){
                gc.points = [];
                expect(gc.points).toEqual([]);
            });

            it ('should sort the points by their (t)ime value', function () {
                var points = [
                    {
                        type: 1,
                        t: 0.25,
                        v: 0.55
                    },
                    {
                        type: 0,
                        t: 0,
                        v: 0.75
                    }
                ];
                gc.points = points;
                expect(gc.points[0].t).toEqual(0);
            });
        });
    });

    describe ('methods', function () {

        describe ('addPoints', function () {
            it ('should be defined', function () {
                expect(gc.addPoints).toBeDefined();
            });

            it ('should add a point the models points array if an Object is provided', function () {
                var orgPointsLength = gc.points.length;
                gc.addPoints({});
                expect(gc.points.length).toBe(orgPointsLength + 1);
            });

            it ('should add an array of points if an array is provided', function () {
                var orgPointsLength = gc.points.length;
                gc.addPoints([{}, {}]);
                expect(gc.points.length).toBe(orgPointsLength + 2);
            });

            it ('should call the sortPointsByTime method', function () {
                spyOn(gc, 'sortPointsByTime');
                gc.addPoints({});
                expect(gc.sortPointsByTime).toHaveBeenCalled();
            });

            it ('should call the events broadcast method', function () {
                spyOn(gc, 'emit');
                gc.addPoints({});
                expect(gc.emit).toHaveBeenCalledWith(GraphControlEvent.ADD_POINTS, gc.points);
            });
        });

        describe ('removePoint', function () {
            it ('should be defined', function () {
                expect(gc.removePoint).toBeDefined();
            });

            it ('should not remove a point if a pointIndex is not supplied', function () {
                var orgPoints = Object.assign([], options.points);
                gc.removePoint();
                expect(gc.points).toEqual(orgPoints);
            });

            it ('should remove a point based on the pointIndex argument', function () {
                var orgPointsLength = gc.points.length;
                var filtered = options.points.filter(function (element, index) {
                    return (index !== 1);
                });
                gc.removePoint(1);
                expect(gc.points).toEqual(filtered);
                expect(gc.points.length).toBe(orgPointsLength - 1);
            });

            it ('should call the events broadcast method', function () {
                spyOn(gc, 'emit');
                gc.removePoint(1);
                expect(gc.emit).toHaveBeenCalledWith(GraphControlEvent.REMOVE_POINT, gc.points);
            });
        });

        describe ('findPointsByTime', function () {
            var points;

            beforeEach(function () {
                points = [
                    { type: 0, t:0, v:0 },
                    { type: 1, t:0.25, v:0.25 },
                    { type: 1, t:0.5, v:0.30 },
                    { type: 0, t:0.6, v:0.19},
                    { type: 0, t:0.75, v:0.15 },
                    { type: 0, t:0.85, v:0.45 },
                    { type: 0, t:0.85, v:0.55 },
                    { type: 0, t:1, v:0.60 }
                ];

                gc.points = points;
            });

            describe ('when (t)ime is a value between two points', function () {
                it ('should return the set of points that surround (t)ime', function () {
                    var tPoints = gc.findPointsByTime(0.55);
                    expect(tPoints).toEqual([points[2], points[3]]);
                });
            });

            describe ('when (t)ime is the same value as a point value', function () {
                it ('should return that point and the following point', function () {
                    var tPoints = gc.findPointsByTime(0.6);
                    expect(tPoints).toEqual([points[3], points[4]]);
                });
            });

            describe ('when two or more points have the same time value', function () {
                it ('should return the first matching point and the second', function () {
                    var tPoints = gc.findPointsByTime(0.85);
                    expect(tPoints).toEqual([points[5], points[6]]);
                });
            });

            describe('when (t)ime is the same as the first points time value', function () {
                it ('should return the first point and the following point', function () {
                    var tPoints = gc.findPointsByTime(0);
                    expect(tPoints).toEqual([points[0], points[1]]);
                });
            });

            describe('when (t)ime is the same as the last points time value', function ( ){
                it ('should return the last point and the preceeding point', function () {
                    var tPoints = gc.findPointsByTime(1);
                    expect(tPoints).toEqual([points[6], points[7]]);
                });
            });
        });

        describe ('sortPointsByTime', function () {
            it ('should sort the order of the points array based on (t)ime', function () {
                var p1 = { type: 0, t: 0.5, v: 0.5 },
                    p2 = { type: 0, t: 0.15, v: 0.8 },
                    points = [
                        { type: 0, t:0, v:0.10 },
                        { type: 0, t:1, v:1 }
                    ];

                gc.points = points;
                gc.addPoints([p1, p2]);
                gc.sortPointsByTime();

                expect(gc.points[1]).toEqual(p2);
                expect(gc.points[2]).toEqual(p1);
            });
        });

        xdescribe ('getInterpByType', function () {
            it ('should be defined', function () {
                expect(gc.getInterpByType).toBeDefined();
            });

            it ('should return an interpolation function based on the type argument', function () {
                expect(gc.getInterpByType(0)).toBe(Interpolation.linear);
                expect(gc.getInterpByType(1)).toBe(Interpolation.cubic);
            });

            it ('should default to LINEAR_INTPL if an unknown type is given', function () {
                expect(gc.getInterpByType('Bacon')).toBe(Interpolation.linear);
            });
        });

        describe ('valueAtTime', function () {
            var points;

            beforeEach (function () {
                points = [
                    { type: 0, t:0, v:0 },
                    { type: 0, t:0.5, v:0 },
                    { type: 0, t:0.75, v:1 },
                    { type: 0, t:1, v:1 }
                ];
            });

            it ('should be defined', function () {
                expect(gc.valueAtTime).toBeDefined();
            });

            xit ('should set the value to the current interpolated graph point', function () {
                gc.points = points;
                // call valueAtTime with a time value
                gc.valueAtTime(0.2);
                expect(gc.value).toBe(0);

                gc.valueAtTime(0.5);
                expect(gc.value).toBe(0);

                // (.75 - 0.5) = 0.25; 0.25 / 4 = 0.0626; (0.5 + 0.625) = 0.5625;
                gc.valueAtTime(0.5625);
                expect(gc.value).toBe(0.25);
            });

            xit ('should return the interpolated graph point value', function () {
                spyOn(Interpolation, 'linear').and.callThrough();
                gc.points = points;
                // call valueAtTime with a time value
                // (.75 - 0.5) = 0.25; 0.25 / 4 = 0.0626; (0.5 + 0.625) = 0.5625;
                var returned = gc.valueAtTime(0.5625);
                expect(Interpolation.linear).toHaveBeenCalled();
                expect(returned).toBe(0.25);
            });

            xit ('should change the interpolation function based on the point type', function () {
                spyOn(Interpolation, 'cubic');
                spyOn(Interpolation, 'linear');

                points[2].type = 1;
                gc.points = points;

                gc.valueAtTime(0.65);

                expect(Interpolation.linear).toHaveBeenCalled();
                expect(Interpolation.cubic).toHaveBeenCalled();
            });
        });
    });
});
