import BaseControl from '../../../../src/soundscape/property-controls/base-control';

describe ('BaseControl', function () {
    var bc, options, events, listener, model, myTransform;

    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        options = {
            events: events,
            propertyName: 'baseProperty',
            value: 0.5
        };
        listener  = {
            update: function () {
                return true;
            }
        };

        myTransform = jasmine.createSpy('myTransform');

        bc = new BaseControl(options);
    });

    describe ('constructor', function () {

        it ('should not throw and error', function () {
            expect(function () {
                new BaseControl();
            }).not.toThrow();
        });

        it ('should not throw when default values are provided', function () {
            expect(function () {
                new BaseControl({ min:100, max: 1000 });
            }).not.toThrow();
        });

        xit ('should throw an error if no propertyName is defined in the model', function () {
            expect(function () {
                new BaseControl();
            }).toThrow(new Error ('BaseControl: model object must have a propertyName attribute defined'));
        });
    });

    describe ('properties', function () {

        xdescribe ('propertName', function () {
            it ('should be defined', function () {
                expect(bc.propertyName).toBeDefined();
            });

            it ('should get the models propertyName value', function () {
                expect(bc.propertyName).toBe('baseProperty');
            });

            it ('should set the models propertyName value', function() {
                bc.propertyName = 'chunky';
                expect(bc.model.propertyName).toBe('chunky');
            });
        });

        describe ('min', function() {
            describe('as a setter', function() {
                it ('should set the models min value', function() {
                    bc.max = 200;
                    bc.min = 100;
                    expect(bc.model.min).toBe(100);
                });

                it ('should not accept values higher than the max value', function() {
                    expect(function() {
                        bc.max = 50;
                        bc.min = 100;
                    }).toThrow(new Error('Property Control: cannot set min property (100) higher than max property (50)'));
                });
            });

            describe ('as a getter', function() {
                it ('should get the models min value', function() {
                    bc.model.min = 10;
                    expect(bc.min).toBe(10);
                });
            });
        });

        describe ('max', function() {
            describe ('as a setter', function() {
                it ('should set the models max value', function() {
                    bc.max = 100;
                    expect(bc.model.max).toBe(100);
                });

                it ('should not accept values lower than the min value', function() {
                    expect(function() {
                        bc.min = 0;
                        bc.max = -5;
                    }).toThrow(new Error('Property Control: cannot set max property (-5) lower than min property (0)'));
                });
            });

            describe ('as a getter', function() {
                it ('should get the models max value', function() {
                    bc.model.max = 50;
                    expect(bc.max).toBe(50);
                });
            });
        });

        describe ('percent', function() {
            describe ('as a setter', function() {
                it ('should only accept a value between 0 and 1', function() {
                    expect(function() {
                        bc.percent = 50;
                    }).toThrow(new Error('Property Control: percent property (50) must be a value with in range 0...1'));
                });

                it ('should set the value property to a corresponding value', function() {
                    bc.max = 200;
                    bc.min = 100;
                    bc.percent = 0.75;
                    expect(bc.value).toBe(175);
                });

                it ('should broadcast a VALUE_CHANGE message and a data object containing the current percent and value properties', function () {
                    bc.max = 200;
                    bc.min = 100;
                    bc.percent = 0.75;
                    var data = {
                        percent: 0.75,
                        value: 175
                    };

                    expect(events.broadcast).toHaveBeenCalledWith(BaseControl.VALUE_CHANGE, data);
                });
            });

            describe ('as a getter', function() {
                it ('should return the models percent property value', function() {
                    bc.model.percent = 0.5;
                    expect(bc.percent).toBe(0.5);
                });

                it ('should apply any transforms to the returned value', function() {
                    var myScaleTransform = function(input) {
                        return input * 0.5;
                    };

                    bc.percent = 1;
                    bc.addTransform(myScaleTransform);
                    bc.addTransform(myScaleTransform);

                    expect(bc.percent).toBe(0.25);
                });

                it ('should not apply transforms to the models percent property', function() {
                    var myScaleTransform = function(input) {
                        return input * 0.5;
                    };

                    bc.percent = 1;
                    bc.addTransform(myScaleTransform);
                    bc.addTransform(myScaleTransform);

                    expect(bc.model.percent).toBe(1);
                });

                it ('should not return values less than the 0', function() {
                    var myLowerTransform = function(input) {
                        return input - 100;
                    };

                    bc.setRange(100, 200);
                    bc.value = 150;
                    bc.addTransform(myLowerTransform);

                    expect(bc.percent).toBe(0);
                });

                it ('should not return values greater than the 1', function() {
                    var myUpperTransform = function(input) {
                        return input + 100;
                    };

                    bc.setRange(100, 200);
                    bc.value = 150;
                    bc.addTransform(myUpperTransform);

                    expect(bc.percent).toBe(1);
                });
            });
        });

        describe ('value', function () {

            describe ('as a setter', function() {
                it ('should set the model value', function () {
                    bc.value = 0.75;
                    expect(bc.value).toBe(0.75);
                });

                it ('should not accept values lower than the min value', function() {
                    bc.min = 0;
                    expect(function() {
                        bc.value = -5;
                    }).toThrow(new Error('Property Control: cannot set value property (-5) lower than min property (0)'));
                });

                it ('should not accept values higher than the max value', function() {
                    bc.max = 100;
                    expect(function() {
                        bc.value = 150;
                    }).toThrow(new Error('Property Control: cannot set value property (150) higher than max property (100)'));
                });

                it ('should set the percent property to a corresponding value', function() {
                    bc.max = 200;
                    bc.min = 100;

                    bc.value = 125;

                    expect(bc.percent).toBe(0.25);
                });

                it ('should broadcast a VALUE_CHANGE message and a data object containing the current percent and value properties', function () {
                    bc.max = 200;
                    bc.min = 100;
                    bc.value = 175;
                    var data = {
                        percent: 0.75,
                        value: 175
                    };

                    expect(events.broadcast).toHaveBeenCalledWith(BaseControl.VALUE_CHANGE, data);
                });

                it ('should only set the model value if the passed value is a number', function () {
                    bc.value = "A String";
                    expect(bc.value).toBe(0.5);
                });
            });

            describe('as as getter', function() {
                it ('should get the model value', function () {
                    expect(bc.value).toBe(0.5);
                });

                it ('should apply any transforms to the retured value', function() {
                    var myScaleTransform = function(input) {
                        return input * 0.5;
                    };

                    bc.setRange(100, 200);

                    bc.value = 160;
                    bc.addTransform(myScaleTransform);
                    bc.addTransform(myScaleTransform);

                    expect(bc.value).toBe(115);
                });

                it ('should not apply any transforms to the models value property', function() {
                    var myScaleTransform = function(input) {
                        return input * 0.5;
                    };

                    bc.setRange(100, 200);

                    bc.value = 160;
                    bc.addTransform(myScaleTransform);
                    bc.addTransform(myScaleTransform);

                    expect(bc.model.value).toBe(160);
                });

                it ('should not return values less than the min property value', function() {
                    var myLowerTransform = function(input) {
                        return input - 100;
                    };

                    bc.setRange(100, 200);
                    bc.value = 150;
                    bc.addTransform(myLowerTransform);

                    expect(bc.value).toBe(100);
                });

                it ('should not return values greater than the max property value', function() {
                    var myUpperTransform = function(input) {
                        return input + 100;
                    };

                    bc.setRange(100, 200);
                    bc.value = 150;
                    bc.addTransform(myUpperTransform);

                    expect(bc.value).toBe(200);
                });
            });
        });

        describe ('useTransforms', function() {
            it ('should default to true', function() {
                expect(bc.useTransforms).toBe(true);
            });

            it ('should apply transforms to returned property values if set to false', function() {
                var myScaleTransform = function(input) {
                    return input * 0.5;
                };
                bc.setRange(0, 100);
                bc.value = 100;

                bc.addTransform(myScaleTransform);

                bc.useTransforms = true;
                expect(bc.value).toBe(50);
                expect(bc.percent).toBe(0.5);
            });

            it ('should not apply transforms to returned property values if set to false', function() {
                var myScaleTransform = function(input) {
                    return input * 0.5;
                };
                bc.setRange(0, 100);
                bc.value = 100;

                bc.addTransform(myScaleTransform);

                bc.useTransforms = false;
                expect(bc.value).toBe(100);
                expect(bc.percent).toBe(1);
            });
        });

        describe ('transforms', function () {
            it ('should contain a list of any added transforms', function() {
                bc.addTransform(myTransform);
                expect(bc.transforms.indexOf(myTransform)).toBe(0);
            });
        });
    });

    describe ('methods', function () {

        describe ('on', function () {
            beforeEach(function () {
                events.on.and.returnValue('myTokenId01');
            });

            it ('should call the on method of the events obj', function () {
                bc.on(BaseControl.VALUE_CHANGE, listener.update, listener);
                expect(events.on).toHaveBeenCalledWith(BaseControl.VALUE_CHANGE, listener.update, listener);
            });

            it ('should throw an error if an invalid event type is passed in', function () {
                expect(function ( ) {
                    bc.on('invalidEvent', listener.update, listener);
                }).toThrow(new Error ('Property Control: attempting to listen to invalid event: invalidEvent'));
            });

            it ('should return a token string', function () {
                var token = bc.on(BaseControl.VALUE_CHANGE, listener.update, listener);
                expect(typeof token).toEqual('string');
            });
        });

        describe ('off', function () {
            it ('should call the off method of the events obj', function () {
                var token = bc.on(BaseControl.VALUE_CHANGE, listener.update, listener);
                bc.off(token, BaseControl.VALUE_CHANGE);
                expect(events.off).toHaveBeenCalledWith(token, BaseControl.VALUE_CHANGE);
            });
        });

        describe ('setRange', function() {
            it ('should be defined', function() {
                expect(bc.setRange).toBeDefined();
            });

            it ('should set the min and max properties', function() {
                bc.setRange(100, 200);
                expect(bc.min).toBe(100);
                expect(bc.max).toBe(200);
            });

            it ('should throw an error if invalid arguments are supplied', function() {
                expect(function() {
                    bc.setRange(100, 0);
                }).toThrow();
            })
        });

        describe ('addTransform', function() {
            it ('should be defined', function() {
                expect(bc.addTransform).toBeDefined();
            });

            it ('should add the transform to the transforms array', function() {
                bc.addTransform(myTransform);
                expect(bc.transforms.length).toBe(1);
            });

            it ('should throw an error if the transform argument is not a function', function() {
                var myTransform = 0;
                expect(function() {
                    bc.addTransform(myTransform);
                }).toThrow(new Error('Property Control: addTransform argument must be a function'));
            });
        });

        describe ('removeTransform', function() {
            it ('should be defined', function() {
                expect(bc.removeTransform).toBeDefined();
            });

            it ('should remove all occurences of the transform from the transforms array', function() {
                var myTransformTwo = jasmine.createSpy('myTransform');

                bc.addTransform(myTransform);
                bc.addTransform(myTransform);
                bc.addTransform(myTransformTwo);

                expect(bc.transforms.length).toBe(3);

                bc.removeTransform(myTransform);
                expect(bc.transforms.length).toBe(1);
            });

            it ('should throw an error if the transform argument is not a function', function() {
                var myTransform = 0;
                expect(function() {
                    bc.removeTransform(myTransform);
                }).toThrow(new Error('Property Control: removeTransform argument must be a function'));
            });
        });
    });
});
