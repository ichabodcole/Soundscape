import Timer from '../../../../src/soundscape/services/timer';
import Utils from '../../../../src/soundscape/services/utils';

describe ('Timer', function() {
    var tm, events, options, model, update;

    beforeEach(function() {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        events.on.and.returnValue('someToken');
        update = function ( ) {
            return true;
        };

        options = {
            events: events,
            interval: 50,
            model: {}
        };

        tm = new Timer(options);
    });

    describe ('constructor', function() {
        it ('should not throw an error', function() {
            expect(function() {
                new Timer(options);
            }).not.toThrow;
        });
    });

    describe ('properties', function() {

        describe ('state', function() {
            describe('the default state', function() {
                it('should be STOPPED', function() {
                    expect(tm.state).toBe(Timer.STOPPED);
                })
            })

            describe ('after calling timer.stop', function() {
                it(' should return Timer.STOPPED', function() {
                    expect(tm.state).toBe(Timer.STOPPED);
                });
            });

            describe ('after calling timer.pause', function() {
                it ('should return Timer.PAUSED', function() {
                    tm.playTime = 100;
                    tm.start();
                    tm.pause();
                    expect(tm.state).toBe(Timer.PAUSED);
                });
            });

            describe ('after calling timer.start', function() {
                it ('should return Timer.TICKING', function() {
                    tm.playTime = 100;
                    tm.start();
                    expect(tm.state).toBe(Timer.TICKING);
                });
            });
        });

        describe ('interval', function() {
            it ('should set the timer models interval value', function() {
                tm.interval = 100;
                expect(tm.model.interval).toBe(100);
            });

            it ('should get the timer modesl interval value', function() {
                tm.model.interval = 100;
                expect(tm.interval).toBe(100);
            });

            it ('should update the setInterval interval period', function() {
                spyOn(tm, 'tick');
                jasmine.clock().install();
                tm.playTime = 1000;
                tm.start();
                jasmine.clock().tick(100);
                tm.interval = 100;
                jasmine.clock().tick(100);
                expect(tm.tick.calls.count()).toBe(3);
                jasmine.clock().uninstall();
            });
        });

        describe ('startTime', function() {
            it ('should be null if the Timer has not started', function() {
                expect(tm.startTime).toBe(null);
            });

            it ('should get the Timer models startTime value', function() {

                tm.model.startTime = 100;
                expect(tm.startTime).toBe(100);
            });

            it ('should set the Timer models startTime value minus the current timeAtPause value', function() {
                tm.timeAtPause = 50;
                tm.startTime = 1000;
                expect(tm.startTime).toBe(950);
            });
        });

        describe ('playTime', function() {
            it ('should be null if not set', function() {
                expect(tm.playTime).toBe(null);
            });

            it ('should set the models playTime value', function() {
                tm.playTime = 2000;
                expect(tm.model.playTime).toEqual(2000);
            });

            it ('should get the Timer models playTime value', function() {
                tm.playTime = 2500;
                expect(tm.playTime).toEqual(2500);
            });

            it ('should only accept positive values', function() {
                expect(function() {
                    tm.playTime = -100;
                }).toThrow(new Error('Timer: playTime (-100) must be greater than 0'));
            });
        });

        describe ('currentTime', function() {
            it ('should be null before the timer has started', function() {
                expect(tm.currentTime).toBe(null);
            });

            it ('should set the models currentTime value', function() {
                tm.playTime = 2000;
                tm.currentTime = 1500;
                expect(tm.model.currentTime).toEqual(1500);
            });

            it ('should get the models currentTime value', function() {
                tm.playTime = 2000;
                tm.currentTime = 2000;
                expect(tm.currentTime).toEqual(2000);
            });

            it ('should only allow values less than or equal to the current playTime', function() {
                tm.playTime = 250;
                expect(function() {
                    tm.currentTime = 300;
                }).toThrow(new Error('Timer: currentTime (300) cannot be greater than playTime (250)'));
            });

            it ('should only accept positive numbers', function() {
                tm.playTime = 2000;
                expect(function() {
                    tm.currentTime = -150;
                }).toThrow(new Error('Timer: currentTime (-150) cannot be less than 0'));
            });
        });

        describe ('epsilon', function() {
            it ('should be null before the timer has started', function() {
                expect(tm.epsilon).toBe(null);
            });

            it ('should set the timer models epsilon value', function() {
                tm.epsilon = 0.5;
                expect(tm.model.epsilon).toEqual(0.5);
            });

            it ('should only accept values between 0 and 1', function() {
                expect(function() {
                    tm.epsilon = 1.2;
                }).toThrow(new Error('Timer: epsilon value (1.2) must be between 0 and 1'));

                expect(function() {
                    tm.epsilon = -0.3;
                }).toThrow(new Error('Timer: epsilon value (-0.3) must be between 0 and 1'));
            });

            it ('should return a value between 0 and 1 that represents the percent complete', function() {
                tm.epsilon = 0.5;
                expect(tm.epsilon).toEqual(0.5);
            });
        });
    });

    describe ('methods', function() {

        beforeEach(function () {
            jasmine.clock().install();
            tm.playTime = 100;
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        describe ('start', function() {

            it ('should be defined', function() {
                expect(tm.start).toBeDefined();
            });

            it ('should set the state variable to TICKING', function() {
                tm.start();
                expect(tm.state).toBe(Timer.TICKING);
            });

            it ('should call the tick method every (n)milliseconds based on the interval', function ( ) {
                spyOn(tm, 'tick');
                tm.start();
                jasmine.clock().tick(100);
                expect(tm.tick.calls.count()).toEqual(2);
            });

            it ('should not reset the startTime if the timer is TICKING or PAUSED', function() {
                jasmine.clock().mockDate();
                tm.playTime = 1000;
                tm.start();
                jasmine.clock().tick(300);
                var firstStart = tm.currentTime;
                tm.start();
                expect(tm.currentTime).toBe(300);
            });

            it ('should throw and error if playTime is not set to a valid value', function() {
                var tm = new Timer(options);
                expect(function() {
                    tm.start();
                }).toThrow(new Error('Timer: valid playTime must be set before calling start'));
            });

            it ('should set the models startTime variable to the current dateTime', function() {
                tm.start();
                var now = Date.now();
                expect(tm.model.startTime).toBe(now);
            });
        });

        describe ('stop', function() {
            it ('should be defined', function ( ) {
                expect(tm.stop).toBeDefined();
            });

            it ('should change the state value to STOPPED', function() {
                tm.start();
                tm.stop();
                expect(tm.state).toBe(Timer.STOPPED);
            });

            it ('should stop calling the tick method', function () {
                spyOn(tm, 'tick');
                tm.start();
                tm.stop();
                jasmine.clock().tick(55);
                expect(tm.tick).not.toHaveBeenCalled();
            });

            it ('should broadcast the STOP event', function () {
                tm.stop();
                expect(events.broadcast).toHaveBeenCalledWith(Timer.STOP);
            });
        });

        describe ('pause', function() {
            it ('should be defined', function() {
                expect(tm.pause).toBeDefined();
            });

            it ('should change the state value to PAUSED', function() {
                tm.start();
                tm.pause();
                expect(tm.state).toBe(Timer.PAUSED);
            });

            it ('should not set the timer state to PAUSED if the timer is not TICKING', function() {
                tm.pause();
                expect(tm.state).not.toBe(Timer.PAUSED);
            });

            it ('should toggle the timer state between PAUSED and TICKING', function() {
                tm.start();
                tm.pause();
                tm.pause();
                expect(tm.state).toBe(Timer.TICKING);
            });

            it ('should maintain the currentTime and epsilon after calling start again', function() {
                jasmine.clock().mockDate();
                tm.playTime = 1000;

                tm.start();
                jasmine.clock().tick(100);

                tm.pause();
                jasmine.clock().tick(200);

                tm.start();
                tm.tick();

                expect(tm.currentTime).toBe(100);
            });

            it ('should stop calling the tick method', function () {
                spyOn(tm, 'tick');
                tm.start();
                tm.pause();
                jasmine.clock().tick(55);

                expect(tm.tick).not.toHaveBeenCalled();
            });

            it ('should broadcast the PAUSE event', function () {
                tm.start();
                tm.pause();

                expect(events.broadcast).toHaveBeenCalledWith(Timer.PAUSE);
            });
        });

        // the tick event should provide the current playTime and epsilon.
        describe ('tick', function() {
            it ('should broadcast the Timer.TICK event with a data object', function() {
                var tickEventData;

                tm.playTime = 100;
                tm.startTime = Date.now();
                tm.tick();

                tickEventData = {
                    playTime: tm.playTime,
                    currentTime: tm.currentTime,
                    epsilon: tm.epsilon
                };

                expect(events.broadcast).toHaveBeenCalledWith(Timer.TICK, tickEventData);
            });

            it ('should broadcast the Timer.COMPLETE event when the currentTime is equal or greater than the playTime', function() {
                jasmine.clock().mockDate();
                tm.playTime = 500;
                tm.start();
                jasmine.clock().tick(510);
                tm.tick();

                expect(events.broadcast).toHaveBeenCalledWith(Timer.COMPLETE);
            });

            it ('should call timer.stop when the currentTime is equal or greater than the playTime', function() {
                spyOn(tm, 'stop');
                jasmine.clock().mockDate();
                tm.playTime = 500;
                tm.start();
                jasmine.clock().tick(500);
                tm.tick();

                expect(tm.stop).toHaveBeenCalled();
            });
        });

        describe ('on', function () {
            it ('should be defined', function ( ) {
                expect(tm.on).toBeDefined();
            });

            it ('should call the events obj on method', function () {
                tm.on(Timer.TICK, update, null);
                expect(events.on).toHaveBeenCalledWith(Timer.TICK, jasmine.any(Function), jasmine.any(Object));
            });

            it ('should return a token string', function () {
                var token = tm.on(Timer.TICK, function () {});
                expect(typeof token).toBe('string');
            });

            it ('should throw an error if trying to listen to an unknown event', function () {
                expect(function () {
                    tm.on('bacon', function () {});
                }).toThrow(new Error('Unknown event type: bacon'));
            });
        });

        describe ('off', function () {
            it ('should be defined', function () {
                expect(tm.off).toBeDefined();
            });

            it ('should call the events obj off method', function () {
                var token = tm.on(Timer.TICK, function() {});
                tm.off(token, Timer.TICK);
                expect(events.off).toHaveBeenCalledWith(token, Timer.TICK);
            });
        });
    });
});
