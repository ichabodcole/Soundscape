import ColorNoiseModule from '../../../../src/soundscape/modules/color-noise';
import OmniControl from '../../../../src/soundscape/property-controls/omni-control';

describe ('ColorNoiseModule', function() {
    var sm, options;

    beforeEach(function() {
        options = {
            volume: {
                min: 0,
                max: 1,
                value: 0.5
            }
        };

        sm = new ColorNoiseModule();
        sm.start();
    });

    describe ('constructor', function() {
        it ('should not throw an error', function () {
            expect(function () {
                new ColorNoiseModule(options);
            }).not.toThrow();
        });

        it ('should set up default values if provided', function () {
            options.volume.value = 0.5;
            sm = new ColorNoiseModule(options);
            expect(sm.type).toBe('color-noise-module');
            expect(sm.volume.value).toBe(0.5);
        });
    });

    describe ('properties', function () {

        describe ('type', function () {
            it ('should return a type string', function () {
                expect(sm.type).toEqual('color-noise-module');
            });
        });

        describe ('gain', function () {
            it ('should return the gain value as number', function () {
                expect(sm.gain).toBe(1);
            });

            it ('should set the gain property', function () {
                sm.gain = 0;
                expect(sm.gain).toBe(0);
            })
        });

        describe ('mute', function () {
            it ('should return a boolean with a default value of false', function () {
                expect(sm.mute).toBe(false);
            });

            it ('should set the models muted value', function() {
                sm.mute = true;
                expect(sm.mute).toBe(true);
            });

            it ('should set the gain property to 0 when true', function () {
                sm.gain = 1;
                expect(sm.gain).toBe(1);

                sm.mute = true;
                expect(sm.gain).toBe(0);
            });

            it ('it should set the gain property to the volume controls value when set from true to false', function () {
                sm.mute = true;
                expect(sm.gain).toBe(0);
                sm.mute = false;
                expect(sm.gain).toBe(0.5);
            });
        });

        describe ('volume', function () {
            it ('should be defined', function () {
                expect(sm.volume).toBeDefined();
            });

            it ('should update the gain value', function() {
                sm.volume.value = 0.75;
                expect(sm.gain).toBe(0.75);
            });

            it ('should not update the gain value if the sound module is muted', function() {
                sm.mute = true;
                sm.volume.value = 0.25;
                expect(sm.gain).toBe(0);
            });
        });

        describe ('noiseType', function () {
            it ('should be defined', function() {
                expect(sm.noiseType).toBeDefined();
            });

            it ('should return the generators noise type', function() {
                sm.generator.setNoiseType(ColorNoiseModule.PINK_NOISE);
                expect(sm.noiseType).toBe(ColorNoiseModule.PINK_NOISE);
            });

            it ('should set the generators noise type', function() {
                sm.noiseType = ColorNoiseModule.WHITE;
                expect(sm.generator.noiseType).toBe(ColorNoiseModule.WHITE);
            });
        });

        describe ('state', function() {
            it ('should return an object describing the modules current state', function() {
                var sm = new ColorNoiseModule();
                var expectedState = {
                    type: 'color-noise-module',
                    muted: false,
                    volume: {
                        min: 0,
                        max: 1,
                        value: 0.5,
                        controlType: OmniControl.BASE_CONTROL
                    },
                    noiseType: ColorNoiseModule.BROWN_NOISE
                };
                expect(sm.state).toEqual(expectedState);
            });
        });
    });

    describe ('methods', function () {

        describe ('start', function() {
            it ('should call the volume controls on method', function() {
                spyOn(sm.volume, 'on');
                sm.start();
                expect(sm.volume.on).toHaveBeenCalled();
            });

            it('should call the generators start method', function() {
                spyOn(sm.generator, 'start');
                sm.start();
                expect(sm.generator.start).toHaveBeenCalled();
            });
        });

        describe ('stop', function() {
            it ('should call the volume controls off method', function() {
                spyOn(sm.volume, 'removeListener');
                sm.stop();
                expect(sm.volume.removeListener).toHaveBeenCalled();
            });

            it('should call the generators stop method', function() {
                spyOn(sm.generator, 'stop');
                sm.stop();
                expect(sm.generator.stop).toHaveBeenCalled();
            });

        });

        describe ('connect', function () {
            it ('should call the connect method of the gainNode', function () {
                spyOn(sm.gainNode, 'connect');
                sm.connect({});
                expect(sm.gainNode.connect).toHaveBeenCalled();
            });
        });

        describe ('disconnect', function() {
            it ('should call the gainNodes disconnect method', function() {
                spyOn(sm.gainNode, 'disconnect');
                sm.disconnect();
                expect(sm.gainNode.disconnect).toHaveBeenCalled();
            });
        });

        describe ('destroy', function () {
            it ('should be defined', function () {
                expect(sm.destroy).toBeDefined();
            });

            it ('should call the stop method', function() {
                spyOn(sm, 'stop');
                sm.destroy();
                expect(sm.stop).toHaveBeenCalled();
            });

            it ('should call the disconnect method', function() {
                spyOn(sm, 'disconnect');
                sm.destroy();
                expect(sm.disconnect).toHaveBeenCalled();
            });

            it ('should call the generators remove method', function () {
                spyOn(sm.generator, 'remove');
                sm.destroy();
                expect(sm.generator.remove).toHaveBeenCalled();
            });
        });
    });
});
