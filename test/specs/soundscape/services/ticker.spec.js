import Ticker from '../../../../src/soundscape/services/ticker';

describe ('Ticker', function () {
    var tk, events, config, update;

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
        tk = new Ticker(config);
    });

    describe ('constructor', function () {
        it ('should not throw', function () {
            expect(function ( ) {
                new Ticker();
            }).not.toThrow();
        });
    });

    describe ('properties', function() {

        describe ('state', function() {
            describe('the default state', function() {
                it('should be STOPPED', function() {
                    expect(tk.state).toBe(Ticker.STOPPED);
                })
            })

            describe ('after calling ticker.stop', function() {
                it ('should return Ticker.STOPPED', function() {
                    tk.start();
                    tk.stop();
                    expect(tk.state).toBe(Ticker.STOPPED);
                });
            });

            describe ('after calling ticker.start', function() {
                it ('should return Ticker.TICKING', function() {
                    tk.start();
                    expect(tk.state).toBe(Ticker.TICKING);
                });
            });
        });

        describe ('interval', function() {
            it ('should set the ticker models interval value', function() {
                tk.interval = 100;
                expect(tk.model.interval).toBe(100);
            });

            it ('should get the ticker models interval value', function() {
                tk.model.interval = 100;
                expect(tk.interval).toBe(100);
            });

            it ('should update the setInterval interval period', function() {
                spyOn(tk, 'tick');

                jasmine.clock().install();
                tk.start();
                jasmine.clock().tick(100);
                tk.interval = 100;
                jasmine.clock().tick(100);

                expect(tk.tick.calls.count()).toBe(3);
                jasmine.clock().uninstall();
            });

            it ('should create an new interval if the Ticker is TICKING', function() {
                spyOn(tk, 'createInterval');
                tk.start();
                tk.interval = 100;
                //
                expect(tk.createInterval.calls.count()).toBe(2);
            })

            it ('should not update the setInterval period if the Ticker is not TICKING', function() {
                spyOn(tk, 'createInterval');
                tk.start();
                tk.stop();
                tk.interval = 100;
                expect(tk.createInterval.calls.count()).toBe(1);
            });
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
                expect(tk.start).toBeDefined();
            });

            it ('should set the state variable to TICKING', function() {
                tk.start();
                expect(tk.state).toBe(Ticker.TICKING);
            });

            it ('should broadcast the START event', function () {
                tk.start();
                expect(events.broadcast).toHaveBeenCalledWith(Ticker.START);
            });

            it ('should call the tick method every (n)milliseconds based on the interval', function ( ) {
                spyOn(tk, 'tick');
                tk.start();
                jasmine.clock().tick(55);
                expect(tk.tick).toHaveBeenCalled();
            });
        });

        describe ('stop', function () {
            it ('should be defined', function ( ) {
                expect(tk.stop).toBeDefined();
            });

            it ('should change the state value to STOPPED', function() {
                tk.start();
                tk.stop();
                expect(tk.state).toBe(Ticker.STOPPED);
            });

            it ('should stop calling the tick method', function () {
                spyOn(tk, 'tick');
                tk.start();
                tk.stop();
                jasmine.clock().tick(55);
                expect(tk.tick).not.toHaveBeenCalled();
            });

            it ('should broadcast the STOP event', function () {
                tk.stop();
                expect(events.broadcast).toHaveBeenCalledWith(Ticker.STOP);
            });
        });

        describe ('tick', function () {
            it ('should broadcast the TICK event', function () {
                tk.tick();
                expect(events.broadcast).toHaveBeenCalledWith(Ticker.TICK);
            });
        });

        describe ('on', function () {
            it ('should be defined', function ( ) {
                expect(tk.on).toBeDefined();
            });

            it ('should call the events obj on method', function () {
                tk.on(Ticker.TICK, update, null);
                expect(events.on).toHaveBeenCalledWith(Ticker.TICK, jasmine.any(Function), jasmine.any(Object));
            });

            it ('should return a token string', function () {
                var token = tk.on(Ticker.TICK, function () {});
                expect(typeof token).toBe('string');
            });

            it ('should throw an error if trying to listen to an unknown event', function () {
                expect(function () {
                    tk.on('bacon', function () {});
                }).toThrow(new Error('Unknown event type: bacon'));
            });
        });

        describe ('off', function () {
            it ('should be defined', function () {
                expect(tk.off).toBeDefined();
            });

            it ('should call the events obj off method', function () {
                var token = tk.on(Ticker.TICK, function() {});
                tk.off(token, Ticker.TICK);
                expect(events.off).toHaveBeenCalledWith(token, Ticker.TICK);
            });
        });
    });
});
