import Timer from '../../../../src/soundscape/services/timer';

describe ('Timer', function () {
    var tm, events, config, update;

    beforeEach(function () {
        events = jasmine.createSpyObj('events', ['on', 'off', 'broadcast']);
        events.on.and.returnValue('someToken');
        update = function ( ) {
            return true;
        };
        config = {
            events: events,
            interval: 50
        }
        tm = new Timer(config);
    });

    describe ('constructor', function () {
        it ('should not throw', function () {
            expect(function ( ) {
                new Timer(config);
            }).not.toThrow();
        });
    });

    describe ('methods', function () {
        beforeEach(function () {
            jasmine.clock().install();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        describe ('start', function () {
            it ('should be defined', function ( ){
                expect(tm.start).toBeDefined();
            });

            it ('should call the tick method every (n)milliseconds based on the interval', function ( ) {
                spyOn(tm, 'tick');
                tm.start();
                jasmine.clock().tick(55);
                expect(tm.tick).toHaveBeenCalled();
            });

            it ('should broadcast the START event', function () {
                tm.start();
                expect(events.broadcast).toHaveBeenCalledWith(Timer.START);
            });
        });

        describe ('stop', function () {
            it ('should be defined', function ( ) {
                expect(tm.stop).toBeDefined();
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

        describe (Timer.TICK, function () {
            it ('should broadcast the TICK event', function () {
                tm.tick();
                expect(events.broadcast).toHaveBeenCalledWith(Timer.TICK);
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
                }).toThrow(new Error('Timer: Unexpected event: bacon'));
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
